$(document).ready(function () {
    function formatTime(hour, minute) {
        return ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
    }

    function populateTimeOptions(ulElement, startHour = 0, startMinute = 0) {
        ulElement.empty();
        for (let hour = startHour; hour < 24; hour++) {
            for (let minute = (hour === startHour ? startMinute : 0); minute < 60; minute += 15) {
                ulElement.append('<li>' + formatTime(hour, minute) + '</li>');
            }
        }
    }

    function updateEndTimeOptions(startTime) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        populateTimeOptions($('#end-time'), startHour, startMinute + 15);
        $('#end-time').removeClass('disabled');
    }

    function setTimeRange(input, startTime, endTime = '') {
        input.data('start-time', startTime);
        input.text(startTime + (endTime ? ' - ' + endTime : ' - '));
    }

    populateTimeOptions($('#start-time'));
    populateTimeOptions($('#end-time'));
    $('#end-time').addClass('disabled');

    $('#start-time').on('click', 'li', function () {
        const selectedTime = $(this).text();
        const input = $(this).closest('.dropdown').find('#time-range div');
        setTimeRange(input, selectedTime);
        updateEndTimeOptions(selectedTime);
    });

    $('#end-time').on('click', 'li', function () {
        if (!$(this).closest('ul').hasClass('disabled')) {
            const selectedTime = $(this).text();
            const input = $(this).closest('.dropdown').find('#time-range div');
            setTimeRange(input, input.data('start-time'), selectedTime);
        }
    });
  });   