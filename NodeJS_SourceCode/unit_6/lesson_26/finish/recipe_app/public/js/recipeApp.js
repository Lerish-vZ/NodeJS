$(document).ready(() => { //wait for DOM to load 
  $("#modal-button").click(() => { //listen for a click event on the modal button 
    $(".modal-body").html(""); //clear the modal from any previous content
    $.get("/courses?format=json", data => { //request data from /courses?format=json asynchronously
      data.forEach(course => { //loop through array of data in the response
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<div class="course-description">
							${course.description}
						</div>
					</div>` //apped each course to the modal
        );
      });
    });
  });
});
