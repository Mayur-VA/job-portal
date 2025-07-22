import { useEffect, useRef } from 'react';

const sampleJobs = [
  {
    title: "Deliver Partner",
    desc: "Local delivery within 5km",
    image: "https://plus.unsplash.com/premium_photo-1661719291384-a87e9bf9eb75?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Data Entry",
    desc: "Work from home typing",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGF0YSUyMGVudHJ5fGVufDB8fDB8fHww",
  },
  {
    title: "Farm Assistant",
    desc: "On-field seasonal help",
    image: "https://plus.unsplash.com/premium_photo-1681843463640-26fbdced92ff?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const JobList = ({ lowDataMode }) => {
  const imgRefs = useRef([]);

  useEffect(() => {
    if (lowDataMode) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('blur-sm');
          observer.unobserve(img);
        }
      });
    });

    imgRefs.current.forEach((img) => img && observer.observe(img));
    return () => imgRefs.current.forEach((img) => img && observer.unobserve(img));
  }, [lowDataMode]);

  return (
    <div className="space-y-6">
      {sampleJobs.map((job, idx) => (
        <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow text-center transition hover:shadow-md">
          <h4 className="text-lg font-semibold text-blue-800 mb-1"> {job.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{job.desc}</p>
          {!lowDataMode && (
            <img
              data-src={job.image}
              ref={(el) => (imgRefs.current[idx] = el)}
              className="mx-auto w-full max-w-sm h-48 object-cover rounded blur-sm transition"
              alt={job.title}
            />
          )}
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
            Apply Now
          </button>
         
        </div>
      ))}
    </div>
  );
};

export default JobList;
