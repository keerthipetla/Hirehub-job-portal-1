import React, { useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const [selectedCategory, setSelectedCategory] =
  useState(null);
  const categories = [
    {
  id: 1,
  title: "Graphics & Design",
  subTitle: "305 Open Positions",
  details: [
    {
      role: "UI/UX Designer",
      salary: "₹6 - ₹12 LPA",
      companies: ["Adobe", "Canva", "Figma"]
    },
    {
      role: "Graphic Designer",
      salary: "₹4 - ₹8 LPA",
      companies: ["Infosys", "TCS", "Accenture"]
    }
  ],
  icon: <MdOutlineDesignServices />,
},
   {
  id: 2,
  title: "Mobile App Development",
  subTitle: "500 Open Positions",
  details: [
    {
      role: "Flutter Developer",
      salary: "₹4 - ₹10 LPA",
      companies: ["Swiggy", "Zomato", "Dream11"]
    },
    {
      role: "Android Developer",
      salary: "₹5 - ₹12 LPA",
      companies: ["Samsung", "Google", "OnePlus"]
    },
    {
      role: "iOS Developer",
      salary: "₹6 - ₹15 LPA",
      companies: ["Apple", "Infosys", "TCS"]
    }
  ],
  icon: <TbAppsFilled />,
},
   {
  id: 3,
  title: "Frontend Web Development",
  subTitle: "200 Open Positions",
  details: [
    {
      role: "Frontend Developer",
      salary: "₹4 - ₹10 LPA",
      companies: ["Infosys", "Wipro", "Accenture"]
    },
    {
      role: "React Developer",
      salary: "₹5 - ₹12 LPA",
      companies: ["Amazon", "Zoho", "Freshworks"]
    },
    {
      role: "UI Developer",
      salary: "₹4 - ₹8 LPA",
      companies: ["Capgemini", "Cognizant", "TCS"]
    }
  ],
  icon: <MdOutlineWebhook />,
},
   {
  id: 4,
  title: "MERN STACK Development",
  subTitle: "1000+ Open Positions",
  details: [
    {
      role: "MERN Developer",
      salary: "₹5 - ₹12 LPA",
      companies: ["Amazon", "Flipkart", "Zoho"]
    },
    {
      role: "React Developer",
      salary: "₹5 - ₹10 LPA",
      companies: ["Infosys", "TCS", "Wipro"]
    },
    {
      role: "Node.js Developer",
      salary: "₹5 - ₹11 LPA",
      companies: ["Paytm", "PhonePe", "Razorpay"]
    }
  ],
  icon: <FaReact />,
},
    {
  id: 5,
  title: "Account & Finance",
  subTitle: "150 Open Positions",
  details: [
    {
      role: "Accountant",
      salary: "₹3 - ₹7 LPA",
      companies: ["Deloitte", "EY", "KPMG"]
    },
    {
      role: "Financial Analyst",
      salary: "₹5 - ₹12 LPA",
      companies: ["Goldman Sachs", "JP Morgan", "HSBC"]
    }
  ],
  icon: <MdAccountBalance />,
},
  {
  id: 6,
  title: "Artificial Intelligence",
  subTitle: "867 Open Positions",
  details: [
    {
      role: "AI Engineer",
      salary: "₹8 - ₹20 LPA",
      companies: ["Google", "Microsoft", "OpenAI"]
    },
    {
      role: "Machine Learning Engineer",
      salary: "₹10 - ₹25 LPA",
      companies: ["Amazon", "NVIDIA", "IBM"]
    },
    {
      role: "Data Scientist",
      salary: "₹8 - ₹18 LPA",
      companies: ["Netflix", "Uber", "Paytm"]
    }
  ],
  icon: <GiArtificialIntelligence />,
},
   {
  id: 7,
  title: "Video Animation",
  subTitle: "50 Open Positions",
  details: [
    {
      role: "Video Editor",
      salary: "₹3 - ₹8 LPA",
      companies: ["Prime Video", "Netflix", "YouTube"]
    },
    {
      role: "Motion Designer",
      salary: "₹4 - ₹9 LPA",
      companies: ["Adobe", "Canva", "Byju's"]
    }
  ],
  icon: <MdOutlineAnimation />,
},
   {
  id: 8,
  title: "Game Development",
  subTitle: "80 Open Positions",
  details: [
    {
      role: "Game Developer",
      salary: "₹5 - ₹15 LPA",
      companies: ["Ubisoft", "EA Sports", "Rockstar"]
    },
    {
      role: "Unity Developer",
      salary: "₹4 - ₹12 LPA",
      companies: ["Tencent", "Krafton", "Nazara"]
    }
  ],
  icon: <IoGameController />,
},
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div
  className="card"
  key={element.id}
  onClick={() =>
    setSelectedCategory(element)
  }
>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
            
          );
        })}
      </div>
      {selectedCategory && (
  <div className="positions-box">
    <button
  className="close-btn"
  onClick={() =>
    setSelectedCategory(null)
  }
>
  ✖
</button>
    <h3>{selectedCategory.title}</h3>

    {selectedCategory.details?.map(
      (item, index) => (
       <div
  key={index}
  className="position-card"
>
          <h4>{item.role}</h4>

         <p className="salary">
  💰 Salary: {item.salary}
</p>

        <p className="company">
  🏢 Companies:
  {item.companies.join(", ")}
</p>
        </div>
      )
    )}
  </div>
)}
    </div>
    
  );
};

export default PopularCategories;
