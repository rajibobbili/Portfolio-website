import React, { useState } from 'react';
import { Upload, FileText, Briefcase, ArrowRight, Sparkles, X, CheckCircle, AlertCircle, XCircle, ArrowUpCircle, GraduationCap, Award, Calendar } from 'lucide-react';

function App() {
  const initialState = {
    step: 1,
    file: null as File | null,
    analysisComplete: false,
    atsScore: 65,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    education: [{
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      achievements: '',
    }],
    experience: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
      achievements: [''],
    }],
    skills: {
      technical: [''],
      soft: [''],
      languages: [''],
      certifications: [''],
    },
  };

  const [showBuilder, setShowBuilder] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleClose = () => {
    setFormData(initialState);
    setShowBuilder(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
        step: 2,
      });
      // Simulate analysis delay
      setTimeout(() => {
        setFormData(prev => ({ ...prev, analysisComplete: true }));
      }, 2000);
    }
  };

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setFormData(prev => {
      if (index !== undefined && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      if (section === 'personalInfo') {
        return { ...prev, personalInfo: { ...prev.personalInfo, [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const addNewItem = (section: string) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      if (section === 'education') {
        newArray.push({
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
          gpa: '',
          achievements: '',
        });
      } else if (section === 'experience') {
        newArray.push({
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          responsibilities: [''],
          achievements: [''],
        });
      }
      return { ...prev, [section]: newArray };
    });
  };

  const removeItem = (section: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-700';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const NewResumeForm = () => (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="border rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText size={20} />
          Personal Information
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text" required
            placeholder="First Name"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text" required
            placeholder="Last Name"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="email" required
            placeholder="Email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="tel" required
            placeholder="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text" required
            placeholder="Location"
            value={formData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <input required
            type="url"
            placeholder="LinkedIn URL"
            value={formData.personalInfo.linkedin}
            onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="border rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award size={20} />
          Professional Summary
        </h4>
        <textarea
          placeholder="Write a compelling professional summary..."
          value={formData.summary}
          onChange={(e) => handleInputChange('root', 'summary', e.target.value)}
          className="border rounded-lg px-4 py-2 w-full h-32"
        />
      </div>

      {/* Education */}
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap size={20} />
            Education
          </h4>
          <button
            onClick={() => addNewItem('education')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={index} className="space-y-4 mb-6">
            {index > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => removeItem('education', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input required
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input required
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input required
                type="text"
                placeholder="Graduation Date"
                value={edu.graduationDate}
                onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text" required
                placeholder="GPA (optional)"
                value={edu.gpa}
                onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
            </div>
            <textarea 
              placeholder="Academic achievements, honors, relevant coursework..."
              value={edu.achievements}
              onChange={(e) => handleInputChange('education', 'achievements', e.target.value, index)}
              className="border rounded-lg px-4 py-2 w-full h-24"
            />
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase size={20} />
            Work Experience
          </h4>
          <button
            onClick={() => addNewItem('experience')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Experience
          </button>
        </div>
        {formData.experience.map((exp, index) => (
          <div key={index} className="space-y-4 mb-6">
            {index > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => removeItem('experience', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text" required
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text" required
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text" required
                placeholder="Location"
                value={exp.location}
                onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                className="border rounded-lg px-4 py-2"
              />
              <div className="flex gap-4">
                <input
                  type="text" required
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                  className="border rounded-lg px-4 py-2 flex-1"
                />
                <input
                  type="text" required
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                  className="border rounded-lg px-4 py-2 flex-1"
                  disabled={exp.current}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" required
                id={`current-${index}`}
                checked={exp.current}
                onChange={(e) => handleInputChange('experience', 'current', e.target.checked ? 'true' : 'false', index)}
                className="rounded border-gray-300"
              />
              <label htmlFor={`current-${index}`}>I currently work here</label>
            </div>
            <textarea
              placeholder="Key responsibilities and achievements..."
              value={exp.responsibilities.join('\n')}
              onChange={(e) => handleInputChange('experience', 'responsibilities', e.target.value, index)}
              className="border rounded-lg px-4 py-2 w-full h-32"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="border rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award size={20} />
          Skills & Certifications
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
            <input
              type="text" required
              placeholder="e.g., JavaScript, React, Node.js (comma separated)"
              value={formData.skills.technical.join(', ')}
              onChange={(e) => handleInputChange('skills', 'technical', e.target.value)}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills</label>
            <input
              type="text" required
              placeholder="e.g., Leadership, Communication, Problem Solving (comma separated)"
              value={formData.skills.soft.join(', ')}
              onChange={(e) => handleInputChange('skills', 'soft', e.target.value)}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <input
              type="text" required
              placeholder="e.g., AWS Certified Developer, PMP (comma separated)"
              value={formData.skills.certifications.join(', ')}
              onChange={(e) => handleInputChange('skills', 'certifications', e.target.value)}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ResumeBuilder = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Build Your Resume</h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`flex-1 h-2 rounded-full mx-1 ${
                formData.step >= num ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {formData.step === 1 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-gray-600 mb-4">Upload your existing resume or start fresh</p>
              <input
                type="file" required
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="space-y-4">
                <label 
                  htmlFor="resume"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition inline-block cursor-pointer"
                >
                  Upload Resume
                </label>
                <div className="block">
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, step: 2 }))}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    or Create New Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">
              {formData.file ? 'AI Analysis' : 'Create Your Resume'}
            </h3>
            {formData.file ? (
              <div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-800 font-medium">
                      Analyzing: {formData.file.name}
                    </p>
                    {formData.analysisComplete && (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        Analysis Complete
                      </span>
                    )}
                  </div>
                  {!formData.analysisComplete ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* ATS Score */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold">ATS Score:</span>
                          <div className="flex items-center">
                            <span className={`text-2xl font-bold ${getScoreColor(formData.atsScore)}`}>
                              {formData.atsScore}
                            </span>
                            <span className={`ml-1 ${getScoreColor(formData.atsScore)}`}>/100</span>
                          </div>
                        </div>
                        {formData.atsScore < 75 && (
                          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                              <ArrowUpCircle size={20} />
                              <span>Your resume needs improvement to pass ATS systems</span>
                            </div>
                            <p className="text-red-600 text-sm mb-4">
                              Most companies use ATS systems to screen resumes. A score below 75% may result in your resume being filtered out.
                            </p>
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">Priority Improvements:</h4>
                              <div className="grid gap-3">
                                <div className="flex items-start gap-2">
                                  <XCircle className="text-red-500 flex-shrink-0 mt-1" size={16} />
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">Missing Key Skills</p>
                                    <p className="text-sm text-gray-600">Add relevant technical skills like "React", "Node.js", "AWS"</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <XCircle className="text-red-500 flex-shrink-0 mt-1" size={16} />
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">Weak Action Verbs</p>
                                    <p className="text-sm text-gray-600">Replace passive phrases with strong action verbs like "Implemented", "Developed", "Led"</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <XCircle className="text-red-500 flex-shrink-0 mt-1" size={16} />
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">Formatting Issues</p>
                                    <p className="text-sm text-gray-600">Use standard section headings: "Experience", "Education", "Skills"</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Analysis Details */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium">Education Section</h4>
                            <p className="text-sm text-gray-600">Well-formatted with clear degree information</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium">Work Experience</h4>
                            <p className="text-sm text-gray-600">Add more quantifiable achievements and metrics</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <XCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium">Skills Section</h4>
                            <p className="text-sm text-gray-600">Missing critical industry keywords and technical skills</p>
                          </div>
                        </div>
                      </div>

                      {/* Keyword Analysis */}
                      <div>
                        <h4 className="font-semibold mb-3">Keyword Analysis</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-100 p-2 rounded">
                            <span className="text-green-800 text-sm">Education</span>
                          </div>
                          <div className="bg-red-100 p-2 rounded">
                            <span className="text-red-800 text-sm">Technical Skills (Missing)</span>
                          </div>
                          <div className="bg-red-100 p-2 rounded">
                            <span className="text-red-800 text-sm">Project Management (Add)</span>
                          </div>
                          <div className="bg-amber-100 p-2 rounded">
                            <span className="text-amber-800 text-sm">Leadership (Strengthen)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NewResumeForm />
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, step: 1 }))}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, step: 3 }))}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {formData.step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Job Matching</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Software Engineer</h4>
                  <span className="text-green-600 font-medium">95% Match</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Tech Corp is looking for a skilled Software Engineer to join our team...
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    $120k - $150k
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Remote
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Full-time
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Frontend Developer</h4>
                  <span className="text-green-600 font-medium">88% Match</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Join our dynamic team as a Frontend Developer and help build...
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    $90k - $120k
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Hybrid
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Full-time
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, step: 2 }))}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleClose}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View All Matches
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {showBuilder && <ResumeBuilder />}
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume with
            <span className="text-indigo-600"> AI-Powered</span> Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create ATS-friendly resumes, get instant feedback, and match with your dream job using advanced AI technology
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setShowBuilder(true)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Resume Upload</h3>
            <p className="text-gray-600">Upload your existing resume or start fresh with our intuitive builder</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600">Get instant feedback and suggestions to improve your resume</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
            <p className="text-gray-600">Find relevant job opportunities based on your skills and experience</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ResuMatch Works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              
              <img 
                src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=800"
                alt="Resume builder interface"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload or Create</h3>
                  <p className="text-gray-600">Upload your existing resume or create a new one using our templates</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Get instant feedback and suggestions for improvement</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Match with Jobs</h3>
                  <p className="text-gray-600">Find relevant job opportunities that match your skills and experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-indigo-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of job seekers who have found their dream jobs using ResuMatch</p>
          <button 
            onClick={() => setShowBuilder(true)}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition flex items-center gap-2 mx-auto"
          >
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText size={24} className="text-indigo-600" />
            <span className="font-semibold text-xl">ResuMatch</span>
          </div>
          <p>© 2024 ResuMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;