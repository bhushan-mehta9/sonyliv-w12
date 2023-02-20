import React from "react";
class ErrorBoundary extends React.Component {
    
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false, errorMessage:'', errorRedirection:"" }
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
      return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {      
      // You can use your own error logging service here
      console.log("error details--", { error, errorInfo })
    }

    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div style={{color:"white",margin: "20% 20% 20% 30%"}}>
            <h2>Oops, Some maintanace work going is going on !!</h2>
            <button
              type="button"
              onClick={() => window.location.reload(false)}
              style={{marginTop: "20px",marginLeft: "30%",textAlign: "center",backgroundColor: "black",color: "white", cursor:"pointer"}}
            >
              Try again?
            </button>
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary