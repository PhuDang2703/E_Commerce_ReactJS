import React, { useRef } from 'react';
import styles from './Contact.module.scss'
import Card from '../../components/card/Card'
import { FaEnvelope, FaPhoneAlt, FaTwitch, FaTwitter } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_6exk61t', 'template_hsln04f', form.current, 'JQU6EA6KTJ30TiDhs')
      .then((result) => {
        toast.success("Mesage sent successfully")
        console.log(result.text);
      }, (error) => {
        toast.error(error.text)
        console.log(error.text);
      });
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input type='text' name='user_name' placeholder='Full Name' required />
              <label>Email</label>
              <input type='email' name='user_email' placeholder='Your active email' required />
              <label>Subject</label>
              <input type='text' name='subject' placeholder='Subject' required />
              <label>Message</label>
              <textarea name='message' cols='30' rows='10'></textarea>
              <button className='--btn --btn-primary'>Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icon}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 705 141 6545</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Tokyo, Japan</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>Cena Dang</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact