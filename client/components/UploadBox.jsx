'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { FiUploadCloud } from 'react-icons/fi'
import { companyRoles } from '../data/companyRoles'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function UploadBox({
  setResult,
  setAnalysisMeta
}) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [company, setCompany] = useState(companyRoles[0].company)
  const [role, setRole] = useState(companyRoles[0].roles[0])

  const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false)
  const [openRoleDropdown, setOpenRoleDropdown] = useState(false)

  const selectedCompanyData = companyRoles.find(
    (item) => item.company === company
  )

  const availableRoles = selectedCompanyData?.roles || []

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
      }
    }
  })

  const handleCompanyChange = (selectedCompany) => {
    const selectedData = companyRoles.find(
      (item) => item.company === selectedCompany
    )

    setCompany(selectedCompany)
    setRole(selectedData?.roles?.[0] || '')
    setOpenCompanyDropdown(false)
  }

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    setOpenRoleDropdown(false)
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('Upload Resume First')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('resume', file)
      formData.append('company', company)
      formData.append('role', role)
      formData.append('jobDescription', jobDescription)

      const response = await axios.post(
        `${API_BASE_URL}/api/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.data?.success && response.data?.analysis) {
        setResult(response.data.analysis)

        if (setAnalysisMeta) {
          setAnalysisMeta({
            company,
            role,
            jobDescription
          })
        }
      } else {
        alert('Analysis completed but no result was returned.')
      }
    } catch (error) {
      console.log(error)

      alert(
        error?.response?.data?.message ||
        'Analysis Failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="upload-wrapper">
      <div className="upload-header">
        <h1>
          AI Resume Analyzer
        </h1>

        <p>
          Upload your resume and get ATS analysis, AI suggestions,
          company matching, and role-based skill insights.
        </p>
      </div>

      <div
        {...getRootProps()}
        className="modern-upload"
      >
        <input {...getInputProps()} />

        <div className="upload-icon">
          <FiUploadCloud />
        </div>

        <h2>
          {file ? file.name : 'Drop Resume Here'}
        </h2>

        <p>
          PDF only • ATS Optimized • AI Ready
        </p>

        <button
          type="button"
          className="upload-btn"
        >
          Upload Resume
        </button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Target Company
          </label>

          <div className="custom-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                setOpenCompanyDropdown(!openCompanyDropdown)
                setOpenRoleDropdown(false)
              }}
            >
              <span>{company}</span>
              <span>⌄</span>
            </button>

            {openCompanyDropdown ? (
              <div className="dropdown-menu">
                {companyRoles.map((item) => (
                  <button
                    key={item.company}
                    type="button"
                    className={`dropdown-item ${
                      company === item.company ? 'active' : ''
                    }`}
                    onClick={() => handleCompanyChange(item.company)}
                  >
                    {item.company}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="form-group">
          <label>
            Target Role
          </label>

          <div className="custom-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                setOpenRoleDropdown(!openRoleDropdown)
                setOpenCompanyDropdown(false)
              }}
            >
              <span>{role}</span>
              <span>⌄</span>
            </button>

            {openRoleDropdown ? (
              <div className="dropdown-menu">
                {availableRoles.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`dropdown-item ${
                      role === item ? 'active' : ''
                    }`}
                    onClick={() => handleRoleChange(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>
          Job Description
        </label>

        <textarea
          placeholder="Paste job description here to get accurate role-based skill matching..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
        />
      </div>

      <button
        className="button analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? 'Analyzing Resume...' : 'Analyze Resume'}
      </button>
    </div>
  )
}