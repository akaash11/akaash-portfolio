'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  ButtonBase,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { track } from '@/utils/analytics';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Shared card styling
const cardSx = {
  p: 3,
  borderRadius: 2,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('loading');

    // Track submission without PII (GDPR/CCPA compliant)
    track('contact_submit', {
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        console.error('Form submission failed:', data.error || 'Unknown error');
        setSubmitStatus('error');
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Left Column - Contact Form */}
        <Box>
          <Box sx={cardSx}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 0.5 }}>
              Send a Message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Typically replies within 24–48 hours
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Honeypot field */}
              <TextField
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                sx={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name + Email Row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  size="small"
                />
              </Box>

              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                required
                sx={{ mb: 2 }}
              />

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Thanks! Your message has been sent.
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Something went wrong. Please try again.
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={submitStatus === 'loading'}
                startIcon={submitStatus === 'loading' ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{ height: 48 }}
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right Column - Connect & Quick Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Connect Card */}
          <Box sx={cardSx}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 0.5 }}>
              Connect
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Prefer email? Send a note or connect on LinkedIn.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.875rem', lineHeight: 1.6 }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to collaborate on meaningful work.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {/* Email */}
              <ButtonBase
                component="a"
                href="mailto:akaashtrivedi2@gmail.com"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 1.5,
                  justifyContent: 'flex-start',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'action.selected',
                  }}
                >
                  <EmailIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Email
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    akaashtrivedi2@gmail.com
                  </Typography>
                </Box>
                <OpenInNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </ButtonBase>

              {/* LinkedIn */}
              <ButtonBase
                component="a"
                href="https://www.linkedin.com/in/akaash-trivedi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 1.5,
                  justifyContent: 'flex-start',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'action.selected',
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    LinkedIn
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    /in/akaash-trivedi
                  </Typography>
                </Box>
                <OpenInNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </ButtonBase>

              {/* GitHub */}
              <ButtonBase
                component="a"
                href="https://github.com/akaash11"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 1.5,
                  justifyContent: 'flex-start',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'action.selected',
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    GitHub
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @akaash11
                  </Typography>
                </Box>
                <OpenInNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </ButtonBase>

              {/* Twitter */}
              <ButtonBase
                component="a"
                href="https://twitter.com/akaasht"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 1.5,
                  justifyContent: 'flex-start',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'action.selected',
                  }}
                >
                  <TwitterIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Twitter
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @akaasht
                  </Typography>
                </Box>
                <OpenInNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
