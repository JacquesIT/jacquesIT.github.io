export const getItems = async (resource, id, subresource) => {
    try {
      const response = await fetch(`http://localhost:3001/${resource}/${id}/${subresource}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};


export const postItem = async (resource, id, subresource, body) => {
    try {
        const response = await fetch(`http://localhost:3001/${resource}/${id}/${subresource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            return { ok: true, data };
        } else {
            return { ok: false, error: data.message || 'Unknown error' };
        }
    } catch (error) {
        return { ok: false, error: error.message || 'Network error' };
    }
};



// export const patchItem = async (resource, id, subresource) => {
    
// }


// export const deleteItem = async (resource, id, subresource) => {
    
// }