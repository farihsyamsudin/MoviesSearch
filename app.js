function detailsClick(clicked_id){
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=8ee67e92&i=${clicked_id}`,
        success: d => {
            let detail = `<table class="m-4 ">
                            <tr class="p-2 border-black border-2">
                                <td class="p-2 border-black border-2">Waktu Tayang</td>
                                <td class="p-2 border-black border-2">${d.Runtime}</td>
                            </tr>
                            <tr class="p-2 border-black border-2">
                                <td class="p-2 border-black border-2">Genre</td>
                                <td class="p-2 border-black border-2">${d.Genre}</td>
                            </tr>
                            <tr class="p-2 border-black border-2">
                                <td class="p-2 border-black border-2">Sutradara</td>
                                <td class="p-2 border-black border-2">${d.Director}</td>
                            </tr>
                            <tr class="p-2 border-black border-2">
                                <td class="p-2 border-black border-2">Actors</td>
                                <td class="p-2 border-black border-2">${d.Actors}</td>
                            </tr>
                            <tr class="p-2 border-black border-2">
                                <td class="p-2 border-black border-2">Plot</td>
                                <td class="p-2 border-black border-2">${d.Plot}</td>
                            </tr>
                        </table>`
            $('#detailsInfo').html(detail)
            $('#row').toggleClass("blur-sm")
            $('#Header').toggleClass("blur-sm")
            $('#detail').toggleClass("opacity-0")
            $('#detail').toggleClass("-z-50")
            $('search').toggleClass("blur-sm")
            $('buttonSearch').toggleClass("blur-sm")
        },
        error: (e) => {
            console.log(e.responseText());
        }
    });
}

$('#close-details').on('click', function(){
    $('#detail').toggleClass("opacity-0")
    setTimeout(() => {
        $('#detail').toggleClass("-z-50")
        $('#row').toggleClass("blur-sm")
        $('#Header').toggleClass("blur-sm")
    }, 450);
})

$("#buttonSearch").on('click', function(){
    let searchValue = $('#search').val();
    $('#search').val('');
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=8ee67e92&s=${searchValue}`,
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += `<div id="card" class="w-[30%] border my-2 p-2">
                                <img src="${m.Poster}" alt="" class="w-full h-content">
                                <div id="card-body">
                                    <h2 class="font-bold">${m.Title}</h2>
                                    <h2 class="text-slate-500">${m.Year}</h2>
                                    <button id="${m.imdbID}" onClick="detailsClick(this.id)" class="myButtonCard text-center bg-teal-500 rounded-md p-2 hover:bg-teal-700"> View Details</button>
                                </div>
                            </div>`;
            });
            $('.card-template').html(cards);
        },
        error: (e) => {
            console.log(e.responseText());
        }
    });
    // $('#row').toggleClass("border")
})