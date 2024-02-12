export const formatDate = (str) => {
   const date = new Date(str);
   const month = date.toLocaleString('default', { month: 'short' });
   const day = date.getDate();
   const year = date.getFullYear();

   const formattedDate = `${day} ${month} ${year}`;
   return formattedDate;
}

export const formatDate2 = (str) => {
   const parsedDate = new Date(str);

   const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
   }).format(parsedDate);

   return formattedDate;
}


export const hasId = (objects, id) => {
   for (let obj of objects) {
      if (obj.hasOwnProperty('id') && obj.id === id) {
         return true; // Return true if id exists in any object
      }
   }
   return false; // Return false if id does not exist in any object
}

export const currentItem = (items, id) => {
   for (let obj of items) {
      if (obj.hasOwnProperty('id') && obj.id === id) {
         return obj; // Returns the current item from the list based on the current id
      }
   }
}

export const saveToLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key, defaultValue = []) => {
   const storedData = localStorage.getItem(key);
   return storedData ? JSON.parse(storedData) : defaultValue;
};
