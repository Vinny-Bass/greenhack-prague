import CompanyCardList from "../components/CompanyCardList/CompanyCardList"
import Header from "../components/common/Header/Header"

export default function Companies() {
    const mockCompanies = [
        {
            logo: 'https://via.placeholder.com/50',
            name: 'Enado',
            description: 'Specialized supplier with more than a decade of experience, offering fast and quality delivery.',
            rating: 4.5,
            price: '£275,000'
        },
        {
            logo: 'https://via.placeholder.com/50',
            name: 'SolidSun',
            description: 'Experienced supplier with a high level of reliability and quality.',
            rating: 4.7,
            price: '£256,000'
        },
        {
            logo: 'https://via.placeholder.com/50',
            name: 'Woltair',
            description: 'Providing reliable and high-quality delivery with a long history of customer satisfaction.',
            rating: 4.2,
            price: '£269,000'
        }
    ];

    return (
        <>
            <Header />
            <CompanyCardList companies={mockCompanies}/>
        </>
    )
}