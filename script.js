document.addEventListener("DOMContentLoaded", function(){
    const state = document.getElementById("state");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const StartReset = document.getElementById("StartReset");
    const workTime = document.getElementById("workTime");
    const pauseTime = document.getElementById("pauseTime");
    let intervalWork = setInterval(function(){});
    let intervalPause = setInterval(function(){});


    defMinWork = 25;
    defMinPause = 5;

    workTime.addEventListener("change",function(){
        defMinWork = workTime.value;
        if(workTime.value<10){
            minutes.textContent = "0"+workTime.value;
        }else{
            minutes.textContent = workTime.value;
        }
    });

    pauseTime.addEventListener("change",function(){
        defMinPause = pauseTime.value;
    });


    StartReset.addEventListener("click",function(){
        if(StartReset.textContent == "Démarrer"){
            workCountDown();
        }else{
            clearInterval(intervalWork);
            clearInterval(intervalPause);
            state.textContent = "Travail";
            StartReset.textContent = "Démarrer";
            minutes.textContent = defMinWork;
            seconds.textContent = "00";
        }
    });

    function workCountDown(){

        state.textContent = "Travail";
        StartReset.textContent = "Réinitialiser";

        let min = defMinWork-1;
        let sec = 59;

        if(min<10){
            minutes.textContent = "0"+min; 
        }else{
            minutes.textContent = min;
        }

        if(sec<10){
            seconds.textContent = "0"+sec; 
        }else{
            seconds.textContent = sec;
        }

        function everySecond(){

            sec=sec-1;

            if(min<10){
                minutes.textContent = "0"+min; 
            }else{
                minutes.textContent = min;
            }
    
            if(sec<10){
                seconds.textContent = "0"+sec; 
            }else{
                seconds.textContent = sec;
            }

            if(sec==0 && min==0){
                clearInterval(intervalWork);
                pauseCountDown();
            }

            if(sec==0){
                sec=59;
                min=min-1;
            }
        };

        intervalWork = setInterval(everySecond,1000);
    };

    function pauseCountDown(){

        state.textContent = "Pause";

        let min = defMinPause-1;
        let sec = 59;

        if(min<10){
            minutes.textContent = "0"+min; 
        }else{
            minutes.textContent = min;
        }

        if(sec<10){
            seconds.textContent = "0"+sec; 
        }else{
            seconds.textContent = sec;
        }

        function everySecond(){

            sec=sec-1;

            if(min<10){
                minutes.textContent = "0"+min; 
            }else{
                minutes.textContent = min;
            }
    
            if(sec<10){
                seconds.textContent = "0"+sec; 
            }else{
                seconds.textContent = sec;
            }

            if(sec==0 && min==0){
                clearInterval(intervalPause);
                workCountDown();
            }

            if(sec==0){
                sec=59;
                min=min-1;
            }
        };

        intervalPause = setInterval(everySecond,1000);
    };
});