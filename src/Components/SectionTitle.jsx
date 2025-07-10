

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='md: w-1/2 mx-auto text-center py-4'>
            <h3 className='text-3xl font-bold mb-2 text-[#b46a48]'>{heading}</h3>
            <p className='text-[#da7665] mb-8 border-y-2'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;