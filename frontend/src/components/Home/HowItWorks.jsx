import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How HireHub Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                <p>
                 Create your HireHub account to start your career journey. Discover job opportunities, showcase your skills, connect with recruiters, and take the next step toward your dream job.
                    </p>
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                <p>
               Empowering careers and businesses through smart hiring solutions. HireHub connects job seekers with rewarding opportunities and helps employers find skilled professionals, creating meaningful connections that drive success for everyone.
                    </p>
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                <p>
                HireHub connects talented professionals with leading employers, making job searching and recruitment easier, faster, and more effective. Whether you're looking for your next opportunity or seeking the perfect candidate, HireHub helps you achieve your goals.
                   </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
