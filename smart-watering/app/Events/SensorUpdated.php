<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SensorUpdated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $sensor;

    public function __construct($sensor)
    {
        $this->sensor = $sensor;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('sensor-channel'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'sensor.updated';
    }
}