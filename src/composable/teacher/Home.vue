<template>
  <div id="content" class="container-fluid">
      <div class="row justify-content-center">
          <Personal />
          <Performance />
          
      </div>
      <div class="row justify-content-center">
          <TestDuties />
          <Timetable />
          
      </div>
  </div>
</template>

<script>
import Personal from '../../components/Teacher_Home/Personal.vue';
  import Performance from '../../components/Teacher_Home/Performance.vue';
  import TestDuties from '../../components/Teacher_Home/TestDuties.vue';
  import Timetable from '../../components/Teacher_Home/Timetable.vue';
export default {
    components: { 
      Personal, 
      Performance, 
      TestDuties, 
      Timetable 
    }
}
</script>

<style>

</style>