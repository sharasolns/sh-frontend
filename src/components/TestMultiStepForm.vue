<template>
  <div class="container mt-5">
    <h1 class="mb-4">Multi-Step Form Examples</h1>

    <div class="card p-4 mb-4">
      <h3>Simple Multi-Step Registration</h3>
      <p class="text-muted mb-4">A 3-step registration form with visual progress indicator</p>
      <ShAutoForm
        :fields="['name', 'email', 'phone', 'password', 'password_confirmation', 'address', 'city', 'country']"
        :steps="registrationSteps"
        :required="['name', 'email', 'password']"
        action="/api/register"
        actionLabel="Complete Registration"
        @success="handleSuccess"
      />
    </div>

    <div class="card p-4 mb-4">
      <h3>Survey Form with Descriptions</h3>
      <p class="text-muted mb-4">Multi-step survey with step descriptions</p>
      <ShAutoForm
        :fields="['name', 'industry', 'company_size', 'first_name', 'last_name', 'job_title', 'feedback', 'rating']"
        :steps="surveySteps"
        :textAreas="['feedback']"
        :fillSelects="selectOptions"
        action="/tasks/store"
        actionLabel="Submit Survey"
        @success="handleSuccess"
      />
    </div>

    <div class="card p-4">
      <h3>Single Step Form (No Steps)</h3>
      <p class="text-muted mb-4">When no steps are provided, works as a regular form</p>
      <ShAutoForm
        :fields="['name', 'email', 'message']"
        :textAreas="['message']"
        :required="['name', 'email']"
        action="/api/contact"
        actionLabel="Send Message"
        @success="handleSuccess"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ShAutoForm from '../lib/components/ShAutoForm.vue'

const registrationSteps = [
  {
    name: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: ['name', 'email', 'phone'],
    labels: {
      next: 'Continue to Security',
      previous: 'Back'
    }
  },
  {
    name: 'security',
    title: 'Account Security',
    description: 'Create your password',
    fields: ['password', 'password_confirmation'],
    labels: {
      next: 'Continue to Address',
      previous: 'Back to Personal Info'
    }
  },
  {
    name: 'location',
    title: 'Address Details',
    description: 'Where are you located?',
    fields: ['address', 'city', 'country'],
    labels: {
      previous: 'Back to Security'
    }
  }
]

const surveySteps = [
  {
    name: 'company',
    title: 'Company Info',
    description: 'About your organization',
    fields: ['name', 'industry', 'company_size'],
    labels: {
      next: 'Next: Personal Info'
    }
  },
  {
    name: 'personal',
    title: 'Your Details',
    description: 'Tell us about yourself',
    fields: ['first_name', 'last_name', 'job_title'],
    labels: {
      next: 'Next: Feedback',
      previous: 'Previous'
    }
  },
  {
    name: 'feedback',
    title: 'Feedback',
    description: 'Share your thoughts',
    fields: ['feedback', 'rating'],
    labels: {
      previous: 'Previous'
    }
  }
]

const selectOptions = {
  industry: {
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'finance', label: 'Finance' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
      { value: 'other', label: 'Other' }
    ]
  },
  company_size: {
    options: [
      { value: '1-10', label: '1-10 employees' },
      { value: '11-50', label: '11-50 employees' },
      { value: '51-200', label: '51-200 employees' },
      { value: '201+', label: '201+ employees' }
    ]
  },
  rating: {
    options: [
      { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
      { value: '4', label: '⭐⭐⭐⭐ Good' },
      { value: '3', label: '⭐⭐⭐ Average' },
      { value: '2', label: '⭐⭐ Poor' },
      { value: '1', label: '⭐ Very Poor' }
    ]
  }
}

const handleSuccess = (data) => {
  console.log('Form submitted successfully:', data)
  alert('Form submitted! Check console for data.')
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

h1 {
  color: #333;
  font-weight: 700;
}

h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.text-muted {
  color: #6c757d !important;
  font-size: 14px;
}
</style>

