import inquirer from "inquirer";

const questions = [
  // Type your question here
  {
    type: "input",
    name: "userFirstName",
    message: "What's your first name?",
    validate: (userAnswer) => {
      if (!userAnswer) {
        return "Please enter your name sir. ";
      } else {
        return true
      }
    },
  },

  {
    type: "input",
    name: "userEmail",
    message: (userAnswer) => {
      return `Hello ${userAnswer.userFirstName}, What's your email address?`
    },
    validate: (userAnswer) => {
      if (!userAnswer) {
        return "Please enter your email address"
      }

      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validateEmail.test(userAnswer)) {
        return "Please enter valid email address";
      } else {
        return true;
      }
    }  
  },

  {
    type: "list",
    name: "userDevExperience",
    message: "Are you experienced developer?",
    choices:["Yes","No"],
  },

  {
    type: "list",
    name: "userYearsOfExperience",
    message: "How many years of experience you have with javascript?",
    choices:["0-1", "1-3", "3-5", "5-10", "10+"],
    when(userAnswer) {
      return userAnswer.userDevExperience === "Yes"
    }
  },

  {
    type: "checkbox",
    name: "userJavascriptLibrary",
    message: "What JavaScript Library do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "JQuery","D3.js"],
    when(userAnswer) {
      return userAnswer.userDevExperience === "Yes"
    },
    validate: (userAnswer) => {
      if (userAnswer < 1) {
        return "Choose atleast one option"
      } else {
        return true
      }
    }
  },

  {
    type: "number",
    name: "userDesiredSalary",
    message: "What is your desired salary?",
    validate: (userAnswer) => {
      if (!userAnswer || userAnswer < 1) {
        return "Please input desired salary / Salary must be greater than 0 "
      }
      else {
        return true 
      }
    },
    when(userAnswer) {
      return userAnswer.userDevExperience === "Yes"
    },
  }

];

  

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
