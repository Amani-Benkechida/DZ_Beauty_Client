import React, { useState, useEffect } from "react";
import Pres from "./Pres";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useStylists } from "../StylistProvider";

const PRESES = () => {
  const { idservice } = useStylists();
  const [info, setInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  // Fetch prestataires by service
  const fetchPrestatairesByService = async () => {
    try {
      const response = await axios.get("http://localhost:8000/prestataire", {
        params: { service_id: parseInt(idservice) },
      });
      setInfo(response.data.prestataires || []);
    } catch (error) {
      console.error("Error fetching prestataires:", error);
    }
  };

  // Fetch user details for linked prestataires
  const fetchUsers = async () => {
    try {
      const userPromises = info.map(async (id) => {
        try {
          const response = await axios.get(`http://localhost:8000/${id}`);
          return response.data;
        } catch (err) {
          console.error(`Error fetching user for ID ${id}:`, err);
          return null;
        }
      });

      const usersData = await Promise.all(userPromises);
      setUsers(usersData.filter(Boolean)); // Filter out any null responses
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch prestataires when `idservice` changes
  useEffect(() => {
    if (idservice) {
      fetchPrestatairesByService();
    }
  }, [idservice]);

  // Fetch users whenever `info` changes
  useEffect(() => {
    if (info.length > 0) {
      fetchUsers();
    } else {
      setUsers([]); // Clear users if no linked prestataires
    }
  }, [info]);

  return (
    <div className="pt-0 p-24">
      <div
        className="text-darkgray"
        style={{ fontSize: "45px", fontWeight: "100", color: "#323232" }}
      >
        {t("best")}
        <br />
      </div>

      <div className="grid grid-cols-4 gap-4 p-6">
        {info.length > 0 ? (
          users.map((stylist, index) => (
            <Pres
              key={stylist.id || index}
              id={stylist.id}
              name={stylist.name}
              profision={stylist.phone_number}
              image={stylist.image} // Linked user image
            />
          ))
        ) : (
          // Static prestataire (shown if no linked codes)
          <Pres
            id="static"
            name="Static Prestataire"
            profision="Not Linked"
            image="https://via.placeholder.com/150" // Static placeholder image
          />
        )}
      </div>
    </div>
  );
};

export default PRESES;
