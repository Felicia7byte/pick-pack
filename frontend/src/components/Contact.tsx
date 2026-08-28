import Gmail from "../assets/gmail.jpg";
import Instagram from "../assets/instagram.webp";
import Tiktok from "../assets/tiktok.jpg";
import { useEffect, useState } from "react";

function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="contact" className="contact">
      <h1>Contact Us</h1>

      <div className="ipad">
          <div className="time">
            <span>{time}</span>
          </div>

          <div className="icons">
            <div className="icon email">
                <div className="tooltip">pickpacksolution@gmail.com</div>
                <img src={Gmail} alt="Gmail" />
                
            </div>
            <div className="icon instagram">
                <div className="tooltip">pickpack_id</div>
                <a href="https://www.instagram.com/pick_pack_id" target="_blank">
                <img src={Instagram} alt="Gmail" />
                </a>
            </div>
            <div className="icon tiktok">
                <div className="tooltip">pickpack_id</div>
                <a href="https://www.tiktok.com/@pick_pack" target="_blank">
                <img src={Tiktok} alt="Gmail" />
                </a>
            </div>
          </div>
      </div>
      
    </div>
  )
};

export default Contact;