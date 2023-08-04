$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => { 
      let data = results.data; //set up a local variable to represent data
      if (!data || !data.courses) return; //check that the data object contains course information
      data.courses.forEach(course => { //loop through course data, and add elements to modal
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener(); //call addJoinButtonListener to add an event listener on your buttons after the AJAX request completes
    });
  });
});

let addJoinButtonListener = () => { //create the event listener for the modal button
  $(".join-button").click(event => { 
    let $button = $(event.target),
      courseId = $button.data("id"); //grab the button and button ID data
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { //make an AJAX request with the course's ID to join
      let data = results.data;
      if (data && data.success) { //check whether the join action was successful, and modify the button
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
