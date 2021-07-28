export const currencyHelper = {
    methods: {
        currencySymbol(currencyCode) {
            switch (currencyCode) {
                case "GBP":
                    return "£";
                case "EUR":
                    return "€";
                case "USD": 
                    return "$";
                default:
                    return "£";
            }
        }
    }
  };