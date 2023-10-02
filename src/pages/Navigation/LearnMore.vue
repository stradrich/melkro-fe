  <template>
    <div>
      <Step v-for="(step, index) in steps" :key="index" :title="step.title">
        {{ step.content }}
      </Step>
      <p>Ready to get started? Sign up today and embark on your hosting journey!</p>
    </div>
  </template>
  
  <script setup>
  import Step from '../../components/Step'; // Update with the correct path
  
  const steps = [
    { title: 'Step 1: Sign Up', content: 'The first step to becoming a host is to sign up on our platform. It\'s a simple and quick process. Just provide some basic information about yourself and your space, and you\'ll be on your way.' },
    { title: 'Step 2: Create Your Listing', content: 'Once you\'re signed up, you can start creating your listing. Showcase your space with high-quality photos, write a compelling description, and set your availability and pricing. The more details you provide, the more likely you\'ll attract guests.' },
    { title: 'Step 3: Set House Rules', content: 'You\'re in control of your space, so you get to set the rules. Specify any house rules, policies, or requirements that guests should be aware of. Clear expectations lead to better experiences for everyone.' },
    { title: 'Step 4: Communicate with Guests', content: 'Guest communication is key to a successful hosting experience. Respond promptly to inquiries, provide helpful information, and make your guests feel welcome.' },
    { title: 'Step 5: Prepare Your Space', content: 'Before guests arrive, ensure your space is clean, well-maintained, and ready for their stay. A clean and inviting space makes for happy guests.' },
    { title: 'Step 6: Welcome Your Guests', content: 'When your guests arrive, give them a warm welcome. Provide them with any necessary information, keys, or access details they may need during their stay.' },
    { title: 'Step 7: Be a Great Host', content: 'During your guest\'s stay, be available for any questions or assistance they may require. A great host can make a guest\'s experience unforgettable.' },
    { title: 'Step 8: Collect Reviews', content: 'Encourage your guests to leave reviews after their stay. Positive reviews can help you attract more guests in the future.' },
    { title: 'Step 9: Keep Improving', content: 'Hosting is a learning experience. Continuously improve your space and hosting skills based on guest feedback and your own observations.' },
    { title: 'Step 10: Earn Rewards', content: 'As a host, you can earn rewards and build a reputation for your hospitality. Hosting can be a source of income and a way to meet interesting people from all over the world.' },
    // Add other steps as needed
  ];
  </script>
  