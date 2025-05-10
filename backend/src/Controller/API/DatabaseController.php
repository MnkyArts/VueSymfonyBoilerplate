<?php

namespace App\Controller\API;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class DatabaseController extends AbstractController
{
    #[Route('/api/database/status', name: 'api_database_status', methods: ['GET'])]
    public function status(Connection $connection): JsonResponse
    {
        try {
            // Try to connect to the database
            $connection->connect();
            
            return new JsonResponse([
                'status' => 'connected',
                'database' => $connection->getDatabase(),
                'driver' => $connection->getDriver()->getName(),
                'server_version' => $connection->getServerVersion(),
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Could not connect to the database',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}