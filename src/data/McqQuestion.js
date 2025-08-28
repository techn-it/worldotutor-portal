export const mcqQuestions = [
    {
      id: 1,
      category: "React.js",
      question: "Which React hook is commonly used to manage user authentication state after login?",
      options: ["useEffect", "useState", "useContext", "All of the above"],
      correctAnswer: 3,
      explanation: "All hooks can be used: useState for local state, useContext for global auth state, and useEffect for side effects like checking auth status."
    },
    {
      id: 2,
      category: "React.js", 
      question: "What is the recommended way to store authentication tokens in a React application?",
      options: ["localStorage only", "sessionStorage only", "Context API with secure storage", "Global variables"],
      correctAnswer: 2,
      explanation: "Context API provides a secure way to manage auth state across components, combined with appropriate storage mechanisms."
    },
    {
      id: 3,
      category: "React.js",
      question: "Which React Router component is used to protect routes that require authentication?",
      options: ["Route", "Switch", "PrivateRoute (custom component)", "Redirect"],
      correctAnswer: 2,
      explanation: "PrivateRoute is a custom component pattern used to wrap protected routes and redirect unauthenticated users."
    },
    {
      id: 4,
      category: "JavaScript",
      question: "What does 'this' refer to in JavaScript?",
      options: ["The global object", "The calling object", "Depends on the context", "Always undefined"],
      correctAnswer: 2,
      explanation: "The value of 'this' in JavaScript depends on how a function is called - it can refer to different objects in different contexts."
    },
    {
      id: 5,
      category: "Web Development",
      question: "Which HTTP status code indicates a successful response?",
      options: ["404", "500", "200", "302"],
      correctAnswer: 2,
      explanation: "HTTP status code 200 indicates a successful HTTP request."
    },
    {
      id: 6,
      category: "React.js",
      question: "What happens when a user's session expires in a React application?",
      options: ["Show an error message only", "Redirect to login page and clear authentication state", "Refresh the page automatically", "Do nothing"],
      correctAnswer: 1,
      explanation: "When a session expires, the app should redirect to login and clear all authentication state to maintain security."
    },
    {
      id: 7,
      category: "JavaScript",
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: 0,
      explanation: "The push() method adds one or more elements to the end of an array and returns the new length."
    },
    {
      id: 8,
      category: "Web Development",
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1,
      explanation: "CSS stands for Cascading Style Sheets, used for describing the presentation of web documents."
    },
    {
      id: 9,
      category: "React.js",
      question: "Which pattern is commonly used to share authentication state across React components?",
      options: ["Props drilling", "Redux or Context API", "Local component state only", "Window object"],
      correctAnswer: 1,
      explanation: "Redux or Context API are preferred for sharing global state like authentication across multiple components."
    },
    {
      id: 10,
      category: "JavaScript",
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: ["No difference", "=== checks type and value, == checks value only", "== is faster", "=== is deprecated"],
      correctAnswer: 1,
      explanation: "=== performs strict equality checking both type and value, while == performs loose equality with type coercion."
    }
  ];