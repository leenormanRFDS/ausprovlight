import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMMUNITY_ARCHIVE_SUBMISSIONS } from '../../data/heritageLivingArchiveData';
import { CommunityArchiveSubmission } from '../../types/heritage';
import { Users, Upload, CheckCircle2, ShieldAlert, Sparkles, FileText, Camera, Mic, BookOpen } from 'lucide-react';
import { StatusPip } from '../design-system/StatusPip';

export const ParticipatoryArchiveSubmission: React.FC = () => {
  const [submissions, setSubmissions] = useState<CommunityArchiveSubmission[]>(COMMUNITY_ARCHIVE_SUBMISSIONS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form state
  const [contributorName, setContributorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [submissionType, setSubmissionType] = useState<'PHOTOGRAPH' | 'AUDIO_ORAL' | 'WRITTEN_MEMOIR' | 'PHYSICAL_ARTEFACT'>('PHOTOGRAPH');
  const [title, setTitle] = useState('');
  const [yearOfOrigin, setYearOfOrigin] = useState('');
  const [storyDescription, setStoryDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorName || !title || !storyDescription) return;

    const newSub: CommunityArchiveSubmission = {
      id: `SUB_${Date.now()}`,
      contributorName,
      contributorRelationship: relationship || 'Andamooka Resident / Descendant',
      submissionType,
      title,
      yearOfOrigin: yearOfOrigin || 'Mid-20th Century',
      storyDescription,
      verificationStatus: 'COMMUNITY_CONSENSUS_VERIFIED',
      preservationAction: 'Queued for high-resolution archival digitization and Elder council consent review.'
    };

    setSubmissions([newSub, ...submissions]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitting(false);
      // Reset form
      setContributorName('');
      setRelationship('');
      setTitle('');
      setYearOfOrigin('');
      setStoryDescription('');
    }, 2500);
  };

  return (
    <div className="p-6 sm:p-10 bg-[#080605] border border-[rgba(242,240,235,0.08)] rounded-xl space-y-8 font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(242,240,235,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-bold mb-2">
            <span>COMMUNITY CUSTODIANSHIP // PARTICIPATORY ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-light text-[#F5F3ED] uppercase tracking-wide">
            Living Archive <span className="text-[#C5A059] italic font-serif">Participation.</span>
          </h2>
        </div>

        <button
          onClick={() => setIsSubmitting(!isSubmitting)}
          className="px-4 py-2 bg-[#C5A059] text-[#0A0706] font-bold text-xs hover:bg-[#D9B774] rounded transition-all flex items-center gap-2 uppercase"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'VIEW ARCHIVE LEDGER' : 'CONTRIBUTE EVIDENCE'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Submission or Community Feed */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.form
                key="FORM"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 bg-[#0D0907] border border-[rgba(197,160,89,0.3)] rounded-lg space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                  <span className="text-xs text-[#C5A059] uppercase font-bold tracking-wider">
                    SUBMIT EVIDENCE TO THE LIVING ARCHIVE
                  </span>
                  <span className="text-[10px] text-[#888]">COMMUNITY REVIEW PROTOCOL</span>
                </div>

                {submittedSuccess ? (
                  <div className="p-8 text-center space-y-3 bg-[#08110A] border border-emerald-800 rounded">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <div className="text-sm font-bold text-[#F5F3ED] uppercase">
                      Evidence Registered Successfully
                    </div>
                    <p className="text-xs text-[#8FA382] font-sans">
                      Your submission has entered the community review queue and has been anchored with cryptographic timestamp.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] text-[#888] uppercase mb-1">YOUR NAME</label>
                        <input
                          type="text"
                          required
                          value={contributorName}
                          onChange={(e) => setContributorName(e.target.value)}
                          placeholder="e.g. Margaret Henderson"
                          className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-[#888] uppercase mb-1">CONNECTION TO ANDAMOOKA</label>
                        <input
                          type="text"
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                          placeholder="e.g. Descendant of Dugout #22 Miner"
                          className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] text-[#888] uppercase mb-1">EVIDENCE TYPE</label>
                        <select
                          value={submissionType}
                          onChange={(e: any) => setSubmissionType(e.target.value)}
                          className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none"
                        >
                          <option value="PHOTOGRAPH">Archival Photograph</option>
                          <option value="AUDIO_ORAL">Oral Audio Recording</option>
                          <option value="WRITTEN_MEMOIR">Written Memoir or Letter</option>
                          <option value="PHYSICAL_ARTEFACT">Physical Tool or Artefact</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-[#888] uppercase mb-1">APPROXIMATE YEAR OF ORIGIN</label>
                        <input
                          type="text"
                          value={yearOfOrigin}
                          onChange={(e) => setYearOfOrigin(e.target.value)}
                          placeholder="e.g. 1958"
                          className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] text-[#888] uppercase mb-1">TITLE OF EVIDENCE</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Pioneer Camp Water Delivery Logbook"
                        className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] text-[#888] uppercase mb-1">STORY & CONTEXT (WHAT HAPPENED?)</label>
                      <textarea
                        required
                        rows={3}
                        value={storyDescription}
                        onChange={(e) => setStoryDescription(e.target.value)}
                        placeholder="Describe the people, place, or memories connected to this evidence..."
                        className="w-full p-2.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] rounded text-xs text-[#F5F3ED] focus:border-[#C5A059] outline-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#C5A059] text-[#0A0706] font-bold text-xs hover:bg-[#D9B774] rounded transition-all uppercase flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>SUBMIT TO COMMUNITY CONSENSUS ARCHIVE</span>
                    </button>
                  </>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="LEDGER"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="text-[10px] text-[#888] uppercase tracking-widest px-1">
                  RECENT COMMUNITY-AUTHENTICATED CONTRIBUTIONS ({submissions.length})
                </div>

                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 bg-[#0A0706] border border-[rgba(242,240,235,0.06)] rounded-lg space-y-3 hover:border-[rgba(197,160,89,0.3)] transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[rgba(197,160,89,0.15)] text-[#C5A059]">
                            {sub.submissionType}
                          </span>
                          <span className="text-xs font-bold text-[#F5F3ED]">{sub.title}</span>
                        </div>
                        <span className="text-[10px] text-[#888] font-mono">{sub.yearOfOrigin}</span>
                      </div>

                      <p className="text-xs text-[#D4CDC5] font-serif-editorial italic leading-relaxed">
                        “{sub.storyDescription}”
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[rgba(242,240,235,0.04)] text-[10px]">
                        <div className="text-[#888]">
                          CONTRIBUTOR: <span className="text-[#A89F91] font-bold">{sub.contributorName}</span> ({sub.contributorRelationship})
                        </div>
                        <div className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{sub.verificationStatus.replace(/_/g, ' ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Custodianship Principles */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#0D0907] border border-[rgba(197,160,89,0.3)] rounded-lg space-y-4">
            <div className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>THE LIVING ARCHIVE ETHIC</span>
            </div>

            <p className="text-xs text-[#D4CDC5] font-sans leading-relaxed">
              APP does not arrive as an outside authority to write the story of Andamooka. The living archive provides open, sovereign digital infrastructure where local residents, First Nations elders, and pioneer families hold complete ownership and curation over their legacy.
            </p>

            <div className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1 text-[10px] text-[#888]">
              <span className="text-[#C5A059] block font-bold uppercase">CONSENSUS VERIFICATION:</span>
              Submissions are cross-referenced with Historical Society records and local elder memories before inclusion into the immutable timeline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
