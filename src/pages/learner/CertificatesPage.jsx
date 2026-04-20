import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { Award, Download, FileBadge2 } from 'lucide-react';

const certificates = [
  {
    id: 'cert-1',
    courseTitle: 'Academic Skills',
    completedDate: 'March 20, 2026',
    certificateNumber: 'NEXT-ACA-2026-001',
    status: 'Available',
  },
  {
    id: 'cert-2',
    courseTitle: 'Business Analytics Essentials',
    completedDate: null,
    certificateNumber: null,
    status: 'In Progress',
  },
];

export default function CertificatesPage() {
  const availableCertificates = certificates.filter((item) => item.status === 'Available');
  const pendingCertificates = certificates.filter((item) => item.status !== 'Available');

  return (
    <section>
      <PageShell
        title="Certificates"
        description="View completed course certificates and track which courses are still in progress."
        action={
          <ButtonLink to="/learner/dashboard" variant="outline">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Available Certificates" value={String(availableCertificates.length)} />
        <SummaryCard label="Pending Certificates" value={String(pendingCertificates.length)} />
        <SummaryCard label="Total Records" value={String(certificates.length)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr,0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-slate-700" />
            <h2 className="text-2xl font-semibold text-slate-900">Available Certificates</h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Download certificates for courses you have successfully completed.
          </p>

          <div className="mt-6 grid gap-4">
            {availableCertificates.length > 0 ? (
              availableCertificates.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
                        <FileBadge2 className="h-4 w-4" />
                        Certificate Ready
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-slate-900">
                        {item.courseTitle}
                      </h3>

                      <div className="mt-3 grid gap-2 text-sm text-slate-600">
                        <div>
                          <span className="font-medium text-slate-900">Completed on:</span>{' '}
                          {item.completedDate}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Certificate No:</span>{' '}
                          {item.certificateNumber}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Status:</span>{' '}
                          {item.status}
                        </div>
                      </div>
                    </div>

                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
                No certificates available yet.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">In Progress</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              These courses are not yet eligible for certificate download.
            </p>

            <div className="mt-5 grid gap-3">
              {pendingCertificates.length > 0 ? (
                pendingCertificates.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="font-medium text-slate-900">{item.courseTitle}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.status}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
                  No pending certificate items.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Certificate Notes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Certificates are issued when all required lessons and course activities are completed successfully.
              Later, this page can be connected to backend-generated certificate files and verification codes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}