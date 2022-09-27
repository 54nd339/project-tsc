<template>
  <main role="main" id="content" class="tab-content mb-md-5" style="min-height: 85vh;">
    <div id="home" class=" tab-pane fade show active tab-content" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
      <Home />
    </div>
    <div id="download" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-courses-tab" tabindex="0">
      <Download />
    </div>
    <div id="exam" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-success-tab" tabindex="0">
      <Exam />     
    </div>
    <div id="feedback" class="tab-pane fade tab-content" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
      <Feedback />
    </div>
  </main>
</template>

<script>
  import Home from '../composable/student/Home.vue'
  import Download from '../composable/student/Download.vue'
  import Exam from '../composable/student/Exam.vue'
  import Feedback from '../composable/student/Feedback.vue'
  export default {
        components: {
        Home,
        Download,
        Exam,
        Feedback
    }
  }
</script>

<style>

</style>