<template>
 <div id="content" class="container-fluid">
        <div class="row justify-content-center">
            <Personal />
            <Performance />
        </div>
        <div class="row justify-content-center">
            <UpcomingTest />
            <Timetable />
        </div>
    </div>
</template>

<script>
  import Personal from '../../components/Student_Home/Personal.vue';
  import Performance from '../../components/Student_Home/Performance.vue';
  import UpcomingTest from '../../components/Student_Home/UpcomingTest.vue';
  import Timetable from '../../components/Student_Home/Timetable.vue';
export default {
    components: { 
      Personal, 
      Performance, 
      UpcomingTest, 
      Timetable 
    }
}
</script>

<style>

</style>