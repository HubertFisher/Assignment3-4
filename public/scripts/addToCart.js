document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');

    addToCartBtn.addEventListener('click', function () {
        const tourElement = document.getElementById('tourData');
        const tourId = tourElement.getAttribute('data-tour-id');
        const tourName = tourElement.getAttribute('data-tour-name');
        const tourPrice = tourElement.getAttribute('data-tour-price');
        
        console.log(tourId, tourName, tourPrice);
        const data = {
            tourId: tourId,
            tourName: tourName,
            tourPrice: tourPrice,
            quantity: 1
        };

        fetch('/travelAgency/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                alert('Tour added to cart!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding tour to cart. Please try again.');
            });
    });
});
