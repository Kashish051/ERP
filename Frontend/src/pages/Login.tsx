import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "../api/axios";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);


      const res = await axios.post(
        "/auth/login",
        {
          email,
          password
        }
      );


      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      navigate("/dashboard");


    } catch (error) {

      alert("Invalid Email or Password");

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-indigo-100
      px-4
      "
    >


      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        shadow-xl
        p-8
        border
        border-gray-100
        "
      >


        {/* Logo Section */}

        <div className="text-center mb-8">


          <div
            className="
            mx-auto
            w-16
            h-16
            rounded-full
            bg-indigo-500
            text-white
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-md
            "
          >
            ERP
          </div>


          <h1
            className="
            text-3xl
            font-bold
            mt-4
            text-gray-800
            "
          >
            Mini ERP
          </h1>


          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Management Portal Login
          </p>


        </div>




        <form onSubmit={handleLogin}>


          {/* Email */}

          <div className="mb-5">


            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
              "
            >
              Email
            </label>



            <div className="relative">


              <Mail
                size={20}
                className="
                absolute
                left-3
                top-3
                text-gray-400
                "
              />


              <input

                type="email"

                placeholder="admin@erp.com"

                value={email}

                onChange={(e)=>
                  setEmail(e.target.value)
                }

                className="
                w-full
                border
                border-gray-300
                rounded-lg
                py-3
                pl-10
                pr-3
                outline-none
                transition
                focus:ring-2
                focus:ring-indigo-300
                focus:border-indigo-400
                "

                required

              />


            </div>


          </div>





          {/* Password */}


          <div className="mb-6">


            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
              "
            >
              Password
            </label>



            <div className="relative">


              <Lock

                size={20}

                className="
                absolute
                left-3
                top-3
                text-gray-400
                "

              />



              <input


                type={
                  showPassword
                  ?
                  "text"
                  :
                  "password"
                }


                placeholder="Enter password"


                value={password}


                onChange={(e)=>
                  setPassword(e.target.value)
                }


                className="
                w-full
                border
                border-gray-300
                rounded-lg
                py-3
                pl-10
                pr-12
                outline-none
                transition
                focus:ring-2
                focus:ring-indigo-300
                focus:border-indigo-400
                "

                required


              />




              <button

                type="button"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

                className="
                absolute
                right-3
                top-3
                text-gray-500
                hover:text-indigo-500
                "

              >

                {
                  showPassword
                  ?
                  <EyeOff size={20}/>
                  :
                  <Eye size={20}/>
                }


              </button>


            </div>


          </div>





          {/* Login Button */}


          <button

            disabled={loading}

            className="
            w-full
            bg-indigo-500
            hover:bg-indigo-600
            text-white
            py-3
            rounded-lg
            font-semibold
            transition
            shadow-md
            disabled:opacity-50
            "

          >

            {
              loading
              ?
              "Logging in..."
              :
              "Login"
            }


          </button>



        </form>




        <p
          className="
          text-center
          text-sm
          text-gray-400
          mt-6
          "
        >
          © 2026 Mini ERP CRM Portal
        </p>



      </div>



    </div>

  );

}


export default Login;