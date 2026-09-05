import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  const { status, customer_details } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center space-y-6">
          
          {/* Success Checkmark Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Payment Successful!
            </h1>
            <p className="text-sm text-slate-500">
              Thank you for your order. We’re processing it right now.
            </p>
          </div>

          {/* Details Box */}
          <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100 space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">Receipt sent to</span>
              <span className="font-medium text-slate-800 truncate max-w-[200px]">
                {customerEmail || 'Your email'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Paid
              </span>
            </div>
          </div>

          {/* Contact Copy */}
          <p className="text-xs text-slate-500">
            Need help with your order? Reach out to{' '}
            <a
              href="mailto:orders@example.com"
              className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2"
            >
              orders@example.com
            </a>
          </p>

          {/* Navigation Button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}