$(document).ready(function() {
    $('#create-category-button').on('click', function(e) {
        e.preventDefault();
        var data = $('#category-title').val();

        $.ajax({
            url: '/admin/category',
            type: 'POST',
            data: {name: data},
            success: function(response) {
                var html = `
                <tr>
                    <td>${response.title}</td>
                    <td class="d-flex justify-center-content">
                        <a href="/admin/category/${response._id}" class="btn btn-warning btn-sm mr-1">Edit</a>
                        <form action="/admin/category/${response._id}?newMethod=DELETE" method="post">
                            <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
                `;
                $('.category-list').append(html);
            }
        });
        $('#form-category')[0].reset();
        
    });
});