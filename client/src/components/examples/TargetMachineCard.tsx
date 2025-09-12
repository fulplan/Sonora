import { TargetMachineCard } from '../TargetMachineCard';

export default function TargetMachineCardExample() {
  //todo: remove mock functionality
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <TargetMachineCard
        id="target-1"
        name="Windows Server 2019"
        os="Windows"
        ip="192.168.1.10"
        status="online"
        vulnerabilities={3}
        difficulty="beginner"
      />
      <TargetMachineCard
        id="target-2"
        name="Ubuntu 20.04"
        os="Linux"
        ip="192.168.1.20"
        status="compromised"
        vulnerabilities={5}
        difficulty="intermediate"
      />
      <TargetMachineCard
        id="target-3"
        name="macOS Monterey"
        os="macOS"
        ip="192.168.1.30"
        status="offline"
        vulnerabilities={2}
        difficulty="advanced"
      />
    </div>
  );
}