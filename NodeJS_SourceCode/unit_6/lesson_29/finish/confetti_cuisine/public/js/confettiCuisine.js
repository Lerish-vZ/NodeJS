$(document).ready(() => { //wait for the DOM to load
  $("#modal-button").click(() => { //handle a click event on the modal button
    $(".modal-body").html(""); //reset the modal body's contents to an empty string
    $.get(`/api/courses`, (results = {}) => { //fetch course data via an AJAX GET request
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => { //loop through each course, and append to the modal body
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener(); //call addJoinButtonListener to add an event listner on the course listing
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { //make an API call to join the selected course
      let data = results.data;
      if (data && data.success) {
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
