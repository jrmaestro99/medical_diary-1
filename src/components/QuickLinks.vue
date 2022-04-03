<template>
    <h1>Medical Map</h1>
    <h2>Locate hospitals near you!</h2>
    <div class="map">
        <iframe src="https://www.google.com/maps/d/u/5/embed?mid=1PkDhpq_W--3HT_LL-V0PHrP9cuyWX6Zp&ehbc=2E312F" 
        width="640" 
        height="480">
        </iframe>
    </div>
    <h1> Quick Links </h1>
    <h2> Convenient links for your healthcare needs </h2>

    <section class="container">
        <div class="card">
            <div class="card-image doctor-anywhere"></div>
            <h2>Doctor Anywhere</h2>
            <p>Consult an online doctor</p>
            <a href="https://doctoranywhere.com" target="_blank" rel="noopener noreferrer" class="button">Click here</a>
        </div>
        <div class="card">
            <div class="card-image axs"></div>
            <h2>AXS Payment</h2>
            <p>Make payment for your healthcare bills</p>
            <a href="https://e-station2.axs.com.sg/AXSOnline/core_adhoc/healthcare.php" target="_blank" rel="noopener noreferrer" class="button">Click here</a>
        </div>
        <div class="card">
            <div class="card-image covid-guide"></div>
            <h2>Covid-19 Updates</h2>
            <p>Get the latest Covid-19 news</p>
            <a href="https://www.moh.gov.sg/covid-19-phase-advisory" target="_blank" rel="noopener noreferrer" class="button">Click here</a>
        </div>
    </section>
</template>

<script>
export default {
    name: 'QuickLinks',
}
</script>

<style>

@import url(http://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans';
}

.map {
    margin: 2rem;
}

.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem;

}

.card {
    background:antiquewhite; 
    width: 270px;
    height: 375px;
    margin: 10px;
    border-radius: 15px;
    color: #22272e;
}

.card-image {
    background-color: aliceblue;
    height: 170px;
    margin-bottom: 15px;
    background-size: cover;
    border-radius: 15px 15px 0 0;
}

.doctor-anywhere {
    background-image: url('https://img.freepik.com/free-vector/organic-flat-online-medical-conference-illustration_52683-59703.jpg?w=996');
}

.axs {
    background-image: url('https://www.capitaland.com/content/dam/capitaland-tenants/imported/en/-/media/cma-malls/websites/raffles-city/tenants/a/axs_560x462.jpg.transform/cap-lowres/image.jpg');
}

.covid-guide {
    background-image: url("https://img.freepik.com/free-vector/people-showing-effective-ways-prevent-coronavirus_52683-40052.jpg?t=st=1648288828~exp=1648289428~hmac=012861943f95ec12c22b5ab51f1612a4c3d5b1ccb5ccbda42f66f242a83c4d76&w=1480");
}

.card h2 {
    padding: 10px;
}

.card p {
    padding: 10px;
    margin-bottom: 20px;
}

.button {
        cursor: pointer;
        display: inline;
        text-decoration: none;
        color: black;
        background-color: bisque;
        padding: 0.5em 1.25em;
        border-radius: 0.5em;
    }

.card:hover {
    background-color: rgb(179, 140, 93);
    color: beige;
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.5s ease;
}

</style>