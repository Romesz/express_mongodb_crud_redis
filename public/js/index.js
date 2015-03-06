			$('.editUser').on('click', function(e){
				e.preventDefault();
				
				var $this = $(this);
				
				$('#_id').val($this.attr('data-id'));
				$('#editUserName').val($this.attr('data-name'));
				
				$('#editForm').show();
			});
			
			$('#close').on('click', function(e){
				e.preventDefault();
				
				$('#editForm').hide();
			});
			
			$('#editUserForm').submit( function(e){
				e.preventDefault();
				
				var _id	= $('#_id').val();
				var thisUserName	= $('#editUserName').val();
				
				$.ajax({
					type: 'PUT',
					url: './edituser/' + _id,
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({ editName :thisUserName })
				}).done(function(data) {
					// TODO: Inform that the Username changed...
					
					location.reload();	
				}).fail(function(err) {
					// TODO: error handling
				});
			});
			// edit event and ajax call

			
			$('.deleteUser').on('click', function(e){
				e.preventDefault();
				
				var thisUrl	= $(this).attr('href');
				
				$.ajax({
					type: 'DELETE',
					url: thisUrl
				}).done(function(data) {
					// TODO: Inform that the User removed...	
					
					window.location = 'http://localhost:3000/';
				}).fail(function() {
					// TODO: error handling
				});
			});
			// delete event and ajax call