// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function(){

    // Get references to the HTML elements
    const state = document.getElementById("state"); // Element to display 'Travail' or 'Pause'
    const minutes = document.getElementById("minutes"); // Minutes of the timer
    const seconds = document.getElementById("seconds"); // Seconds of the timer
    const StartReset = document.getElementById("StartReset"); // Start/Reset button
    const workTime = document.getElementById("workTime"); // Input for work time
    const pauseTime = document.getElementById("pauseTime"); // Input for pause time

    // Get a reference to the timer container
    var timerContainer = document.querySelector('.timerContainer');

    // Initialize interval timers (used for countdowns)
    let intervalWork = setInterval(function(){});
    let intervalPause = setInterval(function(){});

    // Default work and pause times
    defMinWork = 25;
    defMinPause = 5;

    // Event listener for changes in work time input
    workTime.addEventListener("change",function(){
        if(workTime.value<1){
            workTime.value = 1;
        }
        if(workTime.value>60){
            workTime.value = 60;
        }
        defMinWork = workTime.value;
        if(workTime.value<10){
            minutes.textContent = "0"+workTime.value;
        }else{
            minutes.textContent = workTime.value;
        }
    });

    // Event listener for changes in pause time input
    pauseTime.addEventListener("change",function(){
        if(pauseTime.value<1){
            pauseTime.value = 1;
        }
        if(pauseTime.value>60){
            pauseTime.value = 60;
        }
        defMinPause = pauseTime.value;
    });

    // Event listener for Start/Reset button
    StartReset.addEventListener("click",function(){

        timerContainer.style.backgroundColor = "white";
        timerContainer.style.color = "black";
        if(StartReset.textContent == "Démarrer"){
            workCountDown();
        }else{
            
            workTime.disabled = false;
            pauseTime.disabled = false;
            clearInterval(intervalWork);
            clearInterval(intervalPause);

            state.textContent = "Travail";
            StartReset.textContent = "Démarrer";
            
            minutes.textContent = defMinWork;
            seconds.textContent = "00";
        }
    });

    // Function to handle the work countdown
    function workCountDown(){

        timerContainer.style.backgroundColor = "red";
        timerContainer.style.color = "white";

        state.textContent = "Travail";
        StartReset.textContent = "Réinitialiser";

        workTime.disabled = true;
        pauseTime.disabled = true;

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

    // Function to handle the pause countdown
    function pauseCountDown(){

        timerContainer.style.backgroundColor = "green";

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
