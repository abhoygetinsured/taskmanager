import { Center } from '@chakra-ui/react'
import React from 'react'
import TaskTable from './TaskTable'

function Home() {
  return (
    <>
        <Center h={'calc(100vh - 4rem)'}>
            <TaskTable />
        </Center>
    </>
  )
}

export default Home