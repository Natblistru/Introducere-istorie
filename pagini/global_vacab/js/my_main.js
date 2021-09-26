// $(document).ready(function(){
   
    var mapa = "lectia1";
    var cuvinte = ["зеркало", "спальня", "ванная", "ковер", "кровать"];
    var contactHTML = '';

    for(i = 0; i < cuvinte.length; i++){
    
        contactHTML = contactHTML + `
        <div class='game-row d-inline-block col-4'>
            <div class='game-checkbox-wrapper error-left-top' ">
                <div class='optionGameImage'>       
                    <img src='assets/pages/images/games/${mapa}/${cuvinte[i]}.png' class=''>
                </div>
            </div>
            <div class='dictionar-outer text-center'>
                <div class='name audio_tag' data-audio='pg84_s_pd_cap'>
                </div>
                <div class='name_outer isHidden' data-name='${cuvinte[i]}'>
                    <div class='name_tag'>${cuvinte[i]}</div>
                    <div class='name_tag_dummy'>...</div>
                </div>
            </div>
        </div>`;
    }

    
    $('#cap').html(contactHTML);
   

    $(".name_outer").click(function(){
        $(".name_outer").toggleClass("isHidden");
    });
// });

