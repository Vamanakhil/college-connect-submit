import { useRegistrationForm } from "../hooks/useRegistrationForm";
import { CheckCircle2, XCircle } from "lucide-react";
import AI_logo from "/public/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg";

// Reusable Components
const TextField = ({ label, value, onChange, type = "text", required }) => (
  <div className="flex flex-col">
    <label className="text-blue-700 text-sm font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const FieldGroup = ({ title, children, required }) => (
  <div className="space-y-3">
    <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">
      {title} {required && <span className="text-red-500">*</span>}
    </h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const PartnerLogos = () => (
  <div className="max-w-4xl mx-auto mt-16">
    <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Partners:</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
      {[
        {
          src: "https://ozonetel.com/wp-content/uploads/2022/02/cropped-Logo-1.png",
          alt: "Ozonetel",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVopAtzxvNHk-pxyTNGqKdcQSUeRpTGEIsmPBtUUktbaV8nF49N4wgeCvmdzwqcHsVCM&usqp=CAU",
          alt: "Google for Developers",
        },
        {
          src: "https://hackday.aidays.io/assets/task-DkqHR0Kb.png",
          alt: "Hackday Logo",
        },
        {
          src: "https://www.iiit.ac.in/wp-content/uploads/2022/06/IIIT_Hyderabad_Logo-e1655116937986.jpg",
          alt: "IIIT Hyderabad",
        },
      ].map((logo, i) => (
        <img key={i} src={logo.src} alt={logo.alt} className="h-16 sm:h-20 w-auto object-contain" />
      ))}
    </div>
  </div>
);

export default function RegistrationForm() {
  const { formData, handleSubmit, updateFormData, message } = useRegistrationForm();

  const addFaculty = () => {
    updateFormData({
      faculty: [...(formData.faculty || []), { name: "", email: "", phone: "" }],
    });
  };

  const updateFaculty = (index, key, value) => {
    const updated = [...formData.faculty];
    updated[index][key] = value;
    updateFormData({ faculty: updated });
  };

  const removeFaculty = (index) => {
    const updated = [...formData.faculty];
    updated.splice(index, 1);
    updateFormData({ faculty: updated });
  };

  return (
    <div className="min-h-screen bg-white font-sans px-4 py-10 sm:px-8">
      {/* Logo */}
      <div className="absolute top-4 left-4 w-[120px]">
        <a href="/">
          <img src={AI_logo} alt="AI Days" className="w-full object-contain" />
        </a>
      </div>

      {/* Main Form */}
      <div className="max-w-3xl mx-auto border border-blue-100 rounded-xl bg-white shadow-lg p-6 sm:p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            College Registration - Summer of AI
          </h1>
          <p className="text-blue-500 mt-2">Empowering students through AI education and innovation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FieldGroup title="College Information">
            <TextField
              required
              label="College Name"
              value={formData.collegeName}
              onChange={(val) => updateFormData({ collegeName: val })}
            />
          </FieldGroup>

          <FieldGroup title="Principal Details" required>
            <TextField
              required
              label="Name"
              value={formData.principalName}
              onChange={(val) => updateFormData({ principalName: val })}
            />
            <TextField
              required
              type="email"
              label="Email"
              value={formData.principalEmail}
              onChange={(val) => updateFormData({ principalEmail: val })}
            />
            <TextField
              required
              type="tel"
              label="Phone Number"
              value={formData.principalPhone}
              onChange={(val) => updateFormData({ principalPhone: val })}
            />
          </FieldGroup>

          <FieldGroup title="Point of Contact (POC)" required>
            <TextField
              required
              label="Name"
              value={formData.pocName}
              onChange={(val) => updateFormData({ pocName: val })}
            />
            <TextField
              required
              type="email"
              label="Email"
              value={formData.pocEmail}
              onChange={(val) => updateFormData({ pocEmail: val })}
            />
            <TextField
              required
              type="tel"
              label="Phone Number"
              value={formData.pocPhone}
              onChange={(val) => updateFormData({ pocPhone: val })}
            />
          </FieldGroup>

          <FieldGroup title="Training & Placement Officer (TPO)">
            <TextField
              label="Name"
              value={formData.tpoName}
              onChange={(val) => updateFormData({ tpoName: val })}
            />
            <TextField
              type="email"
              label="Email"
              value={formData.tpoEmail}
              onChange={(val) => updateFormData({ tpoEmail: val })}
            />
            <TextField
              type="tel"
              label="Phone Number"
              value={formData.tpoPhone}
              onChange={(val) => updateFormData({ tpoPhone: val })}
            />
          </FieldGroup>

          <FieldGroup title="Associated Faculty Members">
            {(formData.faculty || []).map((f, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-3 items-end relative">
                <TextField
                  label="Name"
                  value={f.name}
                  onChange={(val) => updateFaculty(i, "name", val)}
                />
                <TextField
                  type="email"
                  label="Email"
                  value={f.email}
                  onChange={(val) => updateFaculty(i, "email", val)}
                />
                <TextField
                  type="tel"
                  label="Phone"
                  value={f.phone}
                  onChange={(val) => updateFaculty(i, "phone", val)}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFaculty(i)}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFaculty}
              className="text-blue-600 mt-2 hover:underline text-sm"
            >
              + Add Another Faculty
            </button>
          </FieldGroup>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow transition"
          >
            Submit Registration
          </button>

          {message && (
            <div
              className={`mt-6 p-4 border-l-4 ${
                message.success
                  ? "border-green-500 bg-green-100 text-green-800"
                  : "border-red-500 bg-red-100 text-red-800"
              }`}
            >
              <p className="flex items-center gap-2">
                {message.success ? <CheckCircle2 /> : <XCircle />}
                {message.message}
              </p>
              {message.success && message.uid && (
                <p className="mt-2">
                  Reference ID: <span className="font-bold">{message.uid}</span>
                </p>
              )}
            </div>
          )}

          <PartnerLogos />
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-100 py-8 text-center text-sm text-gray-600">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-semibold text-blue-700 text-lg mb-2">VISWAM.ai</p>
          <p className="mb-4">
            Venture for Innovation and Social Wellbeing through AI for the Marginalised
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-blue-600">
           
          </div>
          <p className="mt-6 text-xs text-gray-500">
            A Joint Initiative of Swecha and IIIT Hyderabad
          </p>
        </div>
      </footer>
    </div>
  );
}