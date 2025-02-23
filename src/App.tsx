import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import './App.css'

const sections = [
  {
    src: '',
    title: 'Home',
    description:
      'Welcome to this research project on applying Topological Data Analysis (TDA) to autism diagnosis using fMRI data. This website serves as an interactive walkthrough of the methodology and results.\n This project was made within 36 hours for the 2025 Hacklytics Datathon at the Georgia Institute of Technology, which also happened to be my first Hackathon. I had a lot of fun building this, so if this walkthrough of my research teaches you something about TDA or Machine Learning it would make me very glad.',
  },
  {
    src: '/jpy_html/get_abide_data.html',
    title: 'Getting the dataset',
    description:
      "For this project we will be using a version of the ABIDE preprocessed dataset that has been further processed by extracting out important data from the fMRI scans, such as the correlational matrices of different brain regions. This data set was found on the University of Auckland's research portal. It is being downloaded this way due to the provided model training server having a low upload limit. The dataset contains a total of 1112 data subsets, 539 of which belong to individuals suffering from ASD and 573 belonging to the normal control group.",
  },
  {
    src: '/jpy_html/mapper.html',
    title: 'Topologically mapping the data',
    description:
      'We will solely be looking at the AAL116 parcellation format correlation matrices. After having read the relevant MATLAB files we will be running a few checks to rule out any atypical data. We will then extract only the upper triangular part of the matrix to avoid redundancy, after which we flatten it into a one dimensional vector. We store the vector in the subject_vectors array and the subject filename in its respective array. Running a few more data transformations we then start to reduce the dimensionality using PCA and perform some persistent homology computations with ripser which we will use to generate a persistence diagram. Finally, we will generate a topological mapping of the transformed data, which can be seen on the next page.',
  },
  {
    src: '/jpy_html/mapper_output.html',
    title: 'Mapped Data',
    description:
      'On the left you can see the mapped data represented by a connected structure called a topological shape and or structure. We can interpret a couple of things from this graph: What stands out the most is the large connected structure resembling something like a hook. This structure has a dense main part and a slimmer branched off part, representing groups with similar data, therefore similar brain function. The bigger part of the structure might be the neurotypical control group, whereas the smaller part might be representing the more atypical brain functions of someone with ASD. You can also see outliers scattered around, suggesting that these groups have wildly different brain function, possibly indicating subtypes of autism, or simple preprocessing errors made in the dataset. The problem with this data is the fact that it is inconclusive due to a dataset that is both too small, and poorly analyzed due to time constraints.',
  },
  {
    src: '/jpy_html/bulk_process_TDA.html',
    title:
      'Applying Topological Data Analysis on data and processing it for use in ML',
    description:
      'In this notebook we apply a few basic TDA techniques, such as utilizing persistent homology in order to get persistence entropy values for further use in training a machine learning algorithm to get a higher accuracy rate in classifying ASD patients. We also generate a few diagrams to get an idea of how our data actually looks and what properties it has. Finally, we generate a csv file which will store our processed data for later merging. The data will not be shown on these pages but can be readily found on the GitHub repository.',
  },
  {
    src: '/jpy_html/wasserstein.html',
    title: 'Calculating Wasserstein Distance',
    description:
      'Here we calculate Wasserstein distances between each subjects correlation matrix. I had hoped that this would add some more relevant data in order to make the fusion model more accurate, however, as you will later see it probably only introduced unnecessary noise into the algorithm. After we are done calculating the Wasserstein distances we save it into a csv.',
  },
  {
    src: '/jpy_html/train_model_CLASSIC.html',
    title: 'Training the raw model',
    description:
      'Finally, we have arrived at the really cool stuff! We are now going to train our first machine learning algorithm in this project. Our first model will be a sort of control group in order to see if the TDA data model will perform any better. We will be using a XGBoost model, mainly because the TDA model will also be using one, and these types of models perform better with tabular data. From the raw data we will be using 80% of it to train the model itself, and then use 20% of it to test its accuracy. Both models will be using the same parameters. With the raw data model we got around 64% overall accuracy, which is better than a random guess, albeit still modest performance. Now, let us move onto the fusion model.',
  },
  {
    src: '/jpy_html/train_model_TDA.html',
    title: 'Training the TDA and raw data fusion model',
    description:
      'For the fusion model we start by first extracting the raw data from our dataset, after which we then move onto our our TDA-transformed data and merge that into the raw data. After that apply some more transformation as well as some dimensionality reduction, and finally splitting our test data. After training the model, we finally get our results, but sadly it has around 3.5% lower accuracy than the model trained on raw data. I believe that this is due to added noise caused by our addition of our data we get from our topological data analysis. While it is not great performance, I believe that in practical application either model would make for a decent supplemental method  in the diagnosis of autism.',
  },
  {
    src: '',
    title: 'Closing Words & Citations',
    description:
      'In conclusion, this research explored the feasibility of using TDA in conjunction with machine learning to analyze fMRI data in autism diagnosis. While results did not show a significant improvement over the baseline model, they indicate promising directions for future work, particularly in refining preprocessing techniques and increasing dataset sizes. I will definitely revisit this project someday in order to iterate on it or pick up some information I might not have fully understood at the time of the hackathon.\n\nReferences:\n- Xu, Jiaxing, et al. A Collection of Brain Network Datasets. The University of Auckland, Nanyang Technological University, 2023, https://doi.org/10.17608/k6.auckland.21397377.v6. Dataset. Licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).',
  },
]

function App() {
  return (
    <div className="flex flex-col bg-slate-900 items-center p-10 space-y-5 snap-y snap-mandatory overflow-y-auto w-screen h-screen">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="flex w-full space-x-5 mb-5 snap-start"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: index * 0.2 }}
        >
          {section.src ? (
            <iframe
              src={section.src}
              className="w-2/3 my-4 h-screen border rounded-lg shadow-md"
              title={section.title}
            ></iframe>
          ) : null}
          <Card
            className={`${section.src ? 'w-1/3' : 'w-full'} h-screen p-4 my-4`}
          >
            <CardContent>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {section.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default App
