import React from "react";
import UVPLogo from "../assets/UVP_Logo.jpeg";

const MockInterview = () => {
  const interviews = [
    {
      type: "🎓 Student Visa (F1/F2)",
      questions: [
        {
          q: "Why did you choose this university?",
          a: "This university offers a strong program in my field and has good research opportunities, which align with my academic goals."
        },
        {
          q: "Who is sponsoring your education?",
          a: "My father is sponsoring me. I have all the financial documents to support this."
        },
        {
          q: "What will you do after graduation?",
          a: "I plan to return to my home country and apply my knowledge in the industry or research."
        },
        {
          q: "What is your GRE/IELTS/TOEFL score?",
          a: "My IELTS score is 7.5 overall with no band less than 6.5."
        },
        {
          q: "Why USA and not other countries?",
          a: "The US offers practical education, better exposure, and diverse academic resources."
        }
      ]
    },
    {
      type: "💼 Work Visa (H1B)",
      questions: [
        {
          q: "What is your job title?",
          a: "I’m working as a Software Engineer at ABC Tech Inc."
        },
        {
          q: "What does your company do?",
          a: "ABC Tech Inc provides cloud-based solutions and software services to global clients."
        },
        {
          q: "What is your salary?",
          a: "My annual salary is $90,000 as per my LCA."
        },
        {
          q: "Where will you be working?",
          a: "I will be working at the client's location in San Jose, California."
        },
        {
          q: "What are your responsibilities?",
          a: "I develop and maintain web applications, collaborate with teams, and manage deployments."
        }
      ]
    },
    {
      type: "👨‍👩‍👧 Dependent Visa (H4/F2)",
      questions: [
        {
          q: "What does your spouse do in the US?",
          a: "My spouse is on an H1B visa and works as a Data Analyst at XYZ Corp."
        },
        {
          q: "Where will you stay in the US?",
          a: "We will be staying in Edison, New Jersey."
        },
        {
          q: "When did your spouse go to the US?",
          a: "My spouse went to the US in August 2023."
        },
        {
          q: "What will you do in the US?",
          a: "I plan to stay with my spouse and support the family."
        }
      ]
    },
    {
      type: "🧳 Visitor Visa (B1/B2)",
      questions: [
        {
          q: "Why do you want to go to the US?",
          a: "I’m visiting my son/daughter who is studying/working in the US."
        },
        {
          q: "How long will you stay in the US?",
          a: "I plan to stay for around 2 months."
        },
        {
          q: "Who is sponsoring your visit?",
          a: "My son/daughter is sponsoring my trip and will take care of all expenses."
        },
        {
          q: "Do you plan to work in the US?",
          a: "No, I do not plan to work. This is a temporary visit."
        },
        {
          q: "What ties do you have in India?",
          a: "I have family and property in India. I’ll return after my visit."
        }
      ]
    },
    {
      type: "🔄 L1 Visa",
      questions: [
        {
          q: "Which company are you transferring from?",
          a: "I’m transferring from the India branch of XYZ Global Pvt Ltd."
        },
        {
          q: "What is your role in the company?",
          a: "I’m a Senior Project Manager leading a cross-functional team."
        },
        {
          q: "Why is your transfer important?",
          a: "My expertise is required for a new client project launching in the US."
        },
        {
          q: "Will you return to India?",
          a: "Yes, I will return after my project is completed."
        }
      ]
    },
    {
      type: "🎯 O1 Visa (Extraordinary Ability)",
      questions: [
        {
          q: "What achievements qualify you for O1?",
          a: "I have published multiple peer-reviewed research papers and received national awards in my field."
        },
        {
          q: "How long will your assignment be?",
          a: "The initial term is one year, extendable based on project needs."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={UVPLogo} alt="UVP Logo" className="w-28 h-28 rounded-full" />
        </div>
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Mock Interview Preparation (Optional)
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Below are commonly asked visa interview questions with model answers for different visa categories.
        </p>

        {interviews.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.type}</h2>
            <ul className="space-y-3">
              {section.questions.map((item, i) => (
                <li key={i}>
                  <strong className="text-gray-800">Q: {item.q}</strong>
                  <br />
                  <span className="text-gray-600">A: {item.a}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-10 text-center text-gray-700">
          <p>If you need a live mock interview session, contact us via WhatsApp or Email. Our agent will assist you.</p>
        </div>
      </div>

      {/* About Us Footer */}
      <footer className="text-center text-sm text-yellow-800 mt-10">
        <div className="border-t pt-4 max-w-3xl mx-auto">
          <p>
            <strong>USA VISA PATH (UVP)</strong> helps individuals with US visa slot booking, 
            mock interview preparation, DS-160 assistance, and 24/7 support.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MockInterview;
