import React from 'react';
import '../styles/about.css';
import RecipeIcon from '../images/recipe.png';


const About = () => {
  document.title = 'About RecipeNinja';

  return (
    <div className='body'>
      <h1 className='about-header'>About Us</h1>

      <div className='about-container-1'>
        <p className='about-container-1-p1'>
          Have you ever wanted to know how a certain food was put together? Have
          you ever wanted to know what magical ingredients were used to create
          that delicious meal you recently had at your favorite restaurant? Have
          you ever wanted to simply level up your culinary skills? Well,
          that&apos;s what we&apos;re here for!
          At <strong><em>RecipeNinja</em></strong>, we make it OUR BUSINESS to
          answer these questions for you.
        </p>

        <p>
          At its core, RecipeNinja is an educational and informative website
          about any food that you can think of! We provide a simple, yet
          extensive collection of food recipes to anyone, regardless of your
          experience level dealing with food. Whether you’re an experienced
          chef, a home cook, a gastronomy student, a food fanatic, or just an
          average joe, you’ll definitely find something here that piques the
          interest of the little (or massive) foodie within you.
        </p>
      </div>

      <div className='about-container-2'>
        <div className='about-container-2-div1'>
          <img src={RecipeIcon} alt='recipe'/>
        </div>

        <div className='about-container-2-div2'>
          <h3>DETAILED RECIPE BREAKDOWNS</h3>

          <p>
            Wanna know how much butter you need to put into that pumpkin
            risotto? Wanna know what kinds of nutrients (and in what amount) are
            in those chili cheese tacos that you just made? Wanna know exactly
            what equipments you need at your disposal before making that sweet
            hummingbird cake you’ve been craving all week? Well... you get the
            idea.
          </p>
        </div>
      </div>

      <p className='about-container-3'>
        We provide you with a detailed recipe breakdown for whatever there is to
        know about a recipe. Be it the recipe’s diet list, its nutrient list, or
        its detailed instructions, we’ve got it all here for you!
      </p>

      <div className='about-container-4'>
        <p>
        Now that you’ve learned about who we are, what are you waiting for? Help
        nurture and foster the <em><strong>RecipeNinja</strong></em> within you,
        and start browsing through our extensive food collection to learn how to
        cook your favorite meals!
        </p>
      </div>
    </div>
  );
};


export default About;
