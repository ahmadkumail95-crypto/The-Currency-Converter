const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
const converterContainer = document.querySelector(".converter-container");


// Array to populate the select options


const countries = [{code:"USD", name:"United States Dollar"}, 
    {code:"INR", name:"Indian Rupee"}, 
    {code:"EUR", name:"Euro"},
    {code:"GBP", name:"British Pound Sterling"},
    {code:"AUD", name:"Australian Dollar"},
    {code:"CAD", name:"Canadian Dollar"},   
    {code:"SGD", name:"Singapore Dollar"},
    {code:"CHF", name:"Swiss Franc"},
    {code:"MYR", name:"Malaysian Ringgit"},
    {code:"JPY", name:"Japanese Yen"},
    {code:"CNY", name:"Chinese Yuan"},
    {code:"NZD", name:"New Zealand Dollar"},
    {code:"THB", name:"Thai Baht"},
       { code:"PKR", name:"Pakistani Rupee"
    }
];


// showing countries from array to select tags

countries.forEach((country) => {
    const option1 = document.createElement("option");
     const option2 = document.createElement("option");
 
 option1.value = option2.value = country.code;
    option1.textContent = option2.textContent =  `${country.code} (${country.name})` ;



    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);


});

// Setting default values
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "PKR";



const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value) || 1 ;
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
resultElement.textContent = "Getting exchange rate...";
  




try{
const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
 console.log("Response status:", response.status);
  
 

    const data = await response.json();
     console.log("API data:", data);


    const conversionRate = data.rates[toCurrency];
    console.log("Conversion Rate:", conversionRate);

   

    if(typeof conversionRate === "undefined"){
        resultElement.textContent = "Something went wrong country not available";
        convertedAmountElement.value = "";
    }

else{
     const convertedAmount = (amount * conversionRate).toFixed(2);

      console.log("Converted Amount:", convertedAmount);
    convertedAmountElement.value = convertedAmount;
   

   resultElement.textContent = `${amount} ${fromCurrency} =  ${convertedAmount} ${toCurrency}`;
}
    
}
catch(error){
    console.error("Error fetching exchange rate:", error);
    resultElement.textContent = "Something went wrong. Please try again.";
}
};


fromAmountElement.addEventListener("input", getExchangeRate);
fromCurrencyElement.addEventListener("change", getExchangeRate);
toCurrencyElement.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
 