document.addEventListener('DOMContentLoaded', function () {
    const deleteTourForm = document.getElementById('deleteTourForm');
    const deleteTourBtn = document.getElementById('deleteTourBtn');

    deleteTourBtn.addEventListener('click', async function () {
        const formData = new FormData(deleteTourForm);
        const tourId = formData.get('tourId');
        console.log('tourId:', tourId);
        try {
            const response = await fetch(`/admin/delete/${tourId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting tour');
            }else{
                window.location.href = '/admin';
            }

        } catch (error) {
            console.error('Error:', error);
        }
    });
    const updateTourForm = document.querySelector('#updateTourForm');
    const updateTour = document.getElementById('updateTourbtn');
    updateTour.addEventListener('click', async function () {

      const formData = new FormData(updateTourForm);
      console.log('formData:', formData);
      try {
        const response = await fetch('/admin/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) {
          throw new Error('Error updating tour');
        } 
        
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
});