<template>
    <b-container fluid id="sitemap" class="text-light" style="background-color: #232F3E; width: 100%; overflow: hidden;">
        <b-row class="mx-3 my-1 mx-md-5 my-md-1">
            <b-col md="4" class="p-md-3">
                <b-row class="p-md-2">
                    <b-row class="justify-content-center">
                        <a class="navbar-brand" href="#">
                            <img src="@/assets/logos/TSC_Wide_Banner.png" class="img-fluid" alt="banner">
                        </a>
                    </b-row>
                    <b-row align-h="end" class="mx-auto mt-2 d-flex justify-content-center">
                        <ul style="list-style-type:none; padding-left: 10px;">
                            <li style="float: left" class="mx-5">
                                <b-link class="social-link youtube" href="https://www.youtube.com/@bidwanclassesberhampur">
                                    <font-awesome-icon icon="fa-brands fa-youtube" size="xl" /> <!--@bidwanclassesberhampur-->
                                </b-link>
                            </li>
                            <li style="float: left" class="mx-5">
                                <b-link class="social-link instagram" href="https://www.instagram.com/bidwan_classes_berhampur/">
                                    <font-awesome-icon icon="fa-brands fa-instagram" size="xl" /> <!--@bidwan_classes_berhampur-->
                                </b-link>
                            </li>
                            <li style="float: left" class="mx-5">
                                <b-link class="social-link facebook" href="https://www.facebook.com/bidwan.classes">
                                    <font-awesome-icon icon="fa-brands fa-facebook" size="xl" /> <!--@bidwan.classes-->
                                </b-link>
                            </li>
                        </ul>
                    </b-row>
                </b-row>
                <b-row>
                    <b-col md="6" class="p-md-2">
                        <h5>About Us</h5>
                        <ul style="list-style-type:none; padding-left: 10px;">
                            <li><b-link class="link" @click="gotoSec('about','facilities')">Facilities</b-link></li>
                            <li><b-link class="link" @click="gotoSec('about','team')">Our Team</b-link></li>
                            <li><b-link class="link" @click="gotoSec('about','director')">From Director's Desk</b-link></li>
                        </ul>
                    </b-col>
                    <b-col md="6" class="p-md-2">
                        <h5>Gallery</h5>
                        <ul style="list-style-type:none; padding-left: 10px;">
                            <li><b-link class="link" @click="gotoSec('success','awards')">Awards & Achievements</b-link></li>
                            <li><b-link class="link" @click="gotoSec('success','awards')">Cultural Activities</b-link></li>
                            <li><b-link class="link" @click="gotoSec('success','awards')">Others</b-link></li>
                        </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="8" class="p-md-5 px-md-2">
                <b-row>
                    <b-col md="4">
                        <h5>Visiting Time</h5>
                        <p>Monday to Saturday : <br> 8:30 A.M. to 2:00 P.M. (Morning) <br> 3:30 P.M. to 8:30 P.M. (Evening)</p>
                        <p>Sunday : <br> 8 : 30 A.M. to 2 : 30 P.M. (Morning)</p>
                    </b-col>
                    <b-col md="4">
                        <h5>Locate Us</h5>
                        <p><b-link id="map_link" class="link" @click="gotoSec('contact','map')"><font-awesome-icon icon="fa-solid fa-location-dot" /> View on Map</b-link></p>
                        <p>Talent Sprint Classes, <br> Gajapati Nagar - Main Lane, <br> Behind State Bank of India - ADB Branch, <br> Behampur - 760010 (Odisha) India</p>
                    </b-col>
                    <b-col md="4">
                        <h5>Write or Ring Us</h5>
                        <p>bidwanclasses.brahmapur@gmail.com <br> tsc.bam@rediffmail.com <br> admin@bidwanclasses.com</p>
                        <p>+91-9438339317<br>9040612211, 9439133317</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script setup>
function gotoSec(page,section){
    const btn = document.getElementById(page+'_pill')
    btn.click()
    const sec = document.getElementById(section)
    setTimeout(() => {
        if(sec) scrollTo(0,sec.offsetTop - 50)
    }, 10);
}
</script>

<style>
.link, #sitemap p {
    color: #9199A1 !important;
    text-decoration: none !important;
}
.link:hover, #map_link:hover {
    color: white !important;
    text-decoration: underline !important;
}
.social-link {
    color: white !important;
    text-decoration: none !important;
}
.social-link.youtube:hover {
    color: red !important;
}
.social-link.instagram:hover {
    color: #E1306C !important;
}
.social-link.facebook:hover {
    color: #3B5998 !important;
}
</style>