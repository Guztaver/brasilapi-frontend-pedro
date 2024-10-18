$('#ddd-field').on('input', function() {
  if ($(this).val().length > 2) {
    Swal.fire({
	    title: 'Erro!',
	    text: 'DDD não pode ser maior que 2 dígitos!',
	    icon: 'error',
	    confirmButtonText: 'Ok',
    })
  }
});

$('#ddd-query').on('submit', async function(event) {
  event.preventDefault();

  const dddField = $('#ddd-field').val();

  try {
    const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddField}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const dddJson = await response.json();

    $('#ddd-table-body').empty();

    dddJson.cities.forEach(city => {
      $('#ddd-table-body').append(`<tr>
          <td>${city}</td>
          <td>${dddJson.state}</td>
      </tr>`);
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes('404')) {
      Swal.fire({
        title: 'Erro!',
        text: 'O DDD não existe',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'A consulta falhou. Verifique o DDD digitado.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
});
