import { useEffect, useState } from "react";
import ConsoleLog from "../logger";

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useReCaptcha = (handler) => {

  let script;

  const [reCaptchaKey, SetReCaptchaKey] = useState("");

  useEffect(() => {

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  const executeReCaptcha = (handler) => {

    if ( reCaptchaKey === "" ) {
      ConsoleLog.double("useReCaptcha", "Not yet initialized! reCaptcha can't execute right now.", "error");
      handler(null);
      return;
    }
    
    window.grecaptcha.ready(_ => {
      try {
        window.grecaptcha
          .execute(reCaptchaKey, { 
            action: "login" 
          })
          .then(token => {
            ConsoleLog.double("ReCaptcha V3", "Token is valid");
            console.log("token: " + token);
            handler(token);
          });
      } 
      catch(e){
        ConsoleLog.double("ReCaptcha V3", "Token is invalid", "error");
      };
    });

  }

  const loadReCaptcha = (key) => {

    script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=" + key;
    script.onload = function() {
      SetReCaptchaKey(key);
    }
    
    document.body.appendChild(script);

  }

  return {loadReCaptcha, executeReCaptcha};

};

export default useReCaptcha;
