<template>
  <div id="Enquiry" class="col-md-6 p-2" style="min-height: 45vh;">
    <div class="rounded" style="background-color: #57cc99;">
        <h2 class="py-2 underline">Let's Get in Touch</h2>
        <form>
            <div class="col-md-11 px-3 mx-3">
                <select id="selectCourse" class="form-select mx-1 px-1">
                    <option selected>Select Course</option>
                    <option>ICSE</option>
                    <option>CBSE</option>									
                    <option>CHSE</option>
                    <option>JEE/NEET</option>
                </select>
            </div><br>
            <div class="col-md-11 px-3 mx-3">
                <select id="selectClass" class="form-select mx-1 px-1">
                    <option selected>Select Class</option>
                    <option>6</option>
                    <option>7</option>									
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>									
                    <option>11</option>
                    <option>12</option>
                </select>
            </div><br>
            <div class="col-md-11 px-3 mx-3">
                <input type="text" class="form-control" id="name" placeholder="Enter name" required>
            </div><br>
            <div class="col-md-11 px-3 mx-3">
                <input type="tel" class="form-control" id="phone" placeholder="Enter phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
            </div><br>
            <div class="col-md-11 px-3 mx-3">
                <textarea class="form-control" id="message" rows="5"></textarea>
            </div><br>
            <div class="col-lg-12 d-flex justify-content-center">
                <button class="my-2 btn btn-success">Submit</button>
            </div>
        </form>
    </div>
</div>

</template>

<script>
export default {

}
</script>

<style>

</style>