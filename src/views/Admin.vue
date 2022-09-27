<template>
  <main role="main" id="content" class="tab-content mb-md-5" style="min-height: 85vh;">
		<div id="home" class="tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
			<Home />
		</div>
		<div id="students" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
			<Students />
		</div>
		<div id="teachers" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
            <Teachers />
		</div>
        <div id="courses" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
            <Courses />
		</div>
        <div id="site" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
            <Site />
		</div>
	</main>
</template>

<script>
import Home from '../composable/admin/Home.vue'
import Teachers from '../composable/admin/Teachers.vue'
import Courses from '../composable/admin/Courses.vue'
import Site from '../composable/admin/Site.vue'
import Students from '../composable/admin/Students.vue'
export default {
    components: { 
        Home, 
        Teachers, 
        Courses, 
        Site, 
        Students 
    }
}
</script>

<style>

</style>